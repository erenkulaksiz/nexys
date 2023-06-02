/**
 * @license
 * Copyright 2023 Eren Kulaksiz
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Core } from "../core/index.js";
import {
  version,
  libraryName,
  collectNextJSData,
  collectVercelEnv,
  collectDOMData,
  guid,
} from "../../utils/index.js";
import getPagePath from "../../utils/getPagePath.js";
//import type { LogPoolConstructorParams } from "./types";
import type { requestTypes } from "../../types";
import type { logTypes, NexysOptions, configTypes } from "./../../types";
import type { getDeviceDataReturnTypes } from "./../device/types";

export class LogPool {
  private core: Core;
  // All logs stored here.
  public logs: logTypes[] = [];
  public requests: requestTypes[] = [];

  constructor(core: Core) {
    this.core = core;
  }

  public setLogs(logs: logTypes[]): void {
    if (!Array.isArray(logs))
      throw new Error("LogPool: setLogs() expects an array.");
    // Checking if logs has timestamps and data.
    logs.forEach((log: logTypes) => {
      if (!log.ts)
        throw new Error("LogPool: setLogs() expects an array of logs.");
      if (!log.data)
        throw new Error("LogPool: setLogs() expects an array of logs.");
      if (!log.guid)
        throw new Error("LogPool: setLogs() expects an array of logs.");
    });
    this.logs = logs;
    this.process();
  }

  public setRequests(requests: requestTypes[]): void {
    if (!Array.isArray(requests))
      throw new Error("LogPool: setRequests() expects an array.");
    // Checking if requests has timestamps and data.
    requests.forEach((request: requestTypes) => {
      if (!request?.res)
        throw new Error("LogPool: setRequests() expects an array of requests.");
      if (!request?.status)
        throw new Error("LogPool: setRequests() expects an array of requests.");
      if (!request?.ts)
        throw new Error("LogPool: setRequests() expects an array of requests.");
      if (!request?.guid)
        throw new Error("LogPool: setRequests() expects an array of requests.");
    });
    this.requests = requests;
    // Also process logs.
    this.process();
  }

  public push({ data, options, ts, guid, path }: logTypes): void {
    this.logs.push({
      data,
      ts,
      options,
      guid,
      path,
    });
    this.process();
    this.core.Events.on.logAdd?.({ data, options, ts, guid, path });
    this.core.LocalStorage.addToLogPool({ data, options, ts, guid, path });
  }

  private pushRequest({ res, status, ts, guid }: requestTypes): void {
    this.core.InternalLogger.log(
      "LogPool: Pushing request to requests array.",
      res,
      status,
      ts,
      guid
    );
    this.requests.push({
      res,
      status,
      ts,
      guid,
    });
    this.core.Events.on.requestAdd?.({ res, status, ts, guid });
    this.core.LocalStorage.addToRequest({ res, status, ts, guid });
  }

  public clearLogs(): void {
    this.logs = [];
    this.core.LocalStorage.clearLogPool();
    this.core.Events.on.logsClear?.();
    this.core.InternalLogger.log("LogPool: Cleared logs.");
  }

  public clearRequests(): void {
    this.requests = [];
    this.core.LocalStorage.clearRequests();
    this.core.Events.on.requestsClear?.();
    this.core.InternalLogger.log("LogPool: Cleared requests.");
  }

  /**
   * Process internal data to determine whether or not we should need to send data to the server.
   */
  public process(): void {
    this.core.InternalLogger.log("LogPool: Processing logs...");

    if (this.logs.length > 0 && this.core._logPoolSize != 0) {
      const sendAllOnType = this.core._sendAllOnType;
      if (!sendAllOnType) return;

      // Check if sendAllOnType is array or string.
      if (Array.isArray(sendAllOnType)) {
        // Array
        for (let i = 0; i < this.logs.length; i++) {
          const log = this.logs[i];
          if (!log?.options?.type) continue;
          if (this.core.API._sendingRequest) continue;
          if (sendAllOnType.includes(log.options.type)) {
            this.core.InternalLogger.log(
              `LogPool: sendAllOnType is array and log includes ${log.options.type} type.`
            );
            this.sendAll();
            break;
          }
        }
      } else {
        // String
        for (let i = 0; i < this.logs.length; i++) {
          const log = this.logs[i];
          if (!log?.options?.type) continue;
          if (this.core.API._sendingRequest) continue;
          if (log.options.type == sendAllOnType) {
            this.core.InternalLogger.log(
              `LogPool: sendAllOnType is string and log is ${log.options.type} type.`
            );
            this.sendAll();
            break;
          }
        }
      }
    }

    let logsLength = 0;

    if (this.core._ignoreType !== false) {
      logsLength = this.logs.filter((log) => {
        if (!log?.options?.type) return true;
        if (
          Array.isArray(this.core._ignoreType) &&
          this.core._ignoreType.includes(log.options.type)
        )
          return false;
        if (
          typeof this.core._ignoreType == "string" &&
          this.core._ignoreType == log.options.type
        )
          return false;
        return true;
      }).length;
      const diffLength = this.logs.length - logsLength;
      if (diffLength > this.core._ignoreTypeSize) {
        this.core.InternalLogger.log(
          `LogPool: diffLength (this.logs.length - logsLength): ${diffLength} ignoreTypeSize: ${this.core._ignoreTypeSize} - Ignored logs max reached.`
        );
        logsLength += diffLength;
      } else {
        this.core.InternalLogger.log(
          `LogPool: Ignoring ${diffLength} logs. ignoreType: ${this.core._ignoreType} ignoreTypeSize: ${this.core._ignoreTypeSize}`
        );
      }
    }

    if (logsLength < this.core._logPoolSize) {
      this.core.InternalLogger.log(
        `LogPool: logPoolSize is ${this.core._logPoolSize} but logs length is ${logsLength}`
      );
      return;
    }

    if (this.core.API._sendingRequest) {
      this.core.InternalLogger.log(
        "LogPool: Already sending request to the server."
      );
      return;
    }

    this.core.Events.on.process?.();
    this.sendAll();
  }

  /**
   * Sends all data on Nexys to the server.
   */
  public async sendAll() {
    let _start: number | null = null,
      _end: number | null = null;
    if (this.core._isClient) _start = performance.now();
    this.core.InternalLogger.log("LogPool: sendAll() called.");
    let deviceData: getDeviceDataReturnTypes | "disabled" | "client-disabled" =
      "disabled";
    if (this.core._allowDeviceData) {
      deviceData =
        (await this.core.Device.getDeviceData().catch((err) => null)) ??
        "client-disabled";
    } else {
      deviceData = "disabled";
    }
    const config = this.core._config;

    if (this.logs.length === 0 && this.requests.length === 0) {
      this.core.InternalLogger.log("LogPool: No logs or requests to send.");
      return;
    }

    interface ICollectData {
      logs: logTypes[];
      requests: requestTypes[];
      deviceData: getDeviceDataReturnTypes | "disabled" | "client-disabled";
      package: {
        libraryName: string;
        version: string;
      };
      options: {
        logPoolSize: number;
        allowDeviceData: boolean;
        sendAllOnType: NexysOptions["sendAllOnType"];
        ignoreType: NexysOptions["ignoreType"];
        ignoreTypeSize: number;
      };
      env: {
        type: string;
        isClient: boolean;
      };
      config?: configTypes;
    }

    let CollectData: ICollectData = {
      logs: this.logs,
      requests: this.requests,
      deviceData,
      package: {
        libraryName,
        version,
      },
      options: {
        ...this.core._options,
        logPoolSize: this.core._logPoolSize,
        allowDeviceData: this.core._allowDeviceData,
        sendAllOnType: this.core._sendAllOnType,
        ignoreType: this.core._ignoreType,
        ignoreTypeSize: this.core._ignoreTypeSize,
      },
      env: {
        type: this.core._env,
        isClient: this.core._isClient,
      },
    };

    if (config) {
      CollectData = {
        ...CollectData,
        config,
      };
    }

    const nextJSData = collectNextJSData();
    if (nextJSData) {
      CollectData = {
        ...CollectData,
        env: {
          ...CollectData.env,
          ...nextJSData,
        },
      };
    }

    const vercelEnv = collectVercelEnv();
    if (vercelEnv) {
      CollectData = {
        ...CollectData,
        env: {
          ...CollectData.env,
          ...vercelEnv,
        },
      };
    }

    const DOMData = collectDOMData();
    if (DOMData) {
      CollectData = {
        ...CollectData,
        env: {
          ...CollectData.env,
          ...DOMData,
        },
      };
    }

    this.core.API.sendRequest({
      data: CollectData,
    })
      .then((res) => {
        const data = res.json.data;
        this.core.LocalStorage.setAPIValues(data);
        this.core.InternalLogger.log("API: Successful request", res);
        this.core.Events.on.request.success?.(res);
        this.clearRequests();
        this.clearLogs();
        if (this.core._isClient) _end = performance.now();
        if (_start && _end) {
          this.core.LogPool.push({
            data: {
              type: "LOGPOOL:SENDALL",
              diff: _end - _start,
            },
            ts: new Date().getTime(),
            options: {
              type: "METRIC",
            },
            guid: guid(),
            path: getPagePath(this.core),
          });
          this.core.InternalLogger.log(`API: Request took ${_end - _start}ms.`);
        }
      })
      .catch((err) => {
        this.core.InternalLogger.error("API: Request failed.", err);
        this.core.Events.on.request.error?.(err);
        if (err?.message == "API:FAILED:400:api-key") {
          this.core.InternalLogger.error(
            "API: Your API key is not valid. Please make sure you entered correct credentials."
          );
        }
        if (err?.message !== "API:ALREADY_SENDING") {
          this.core.API.requestCompleted();
          this.pushRequest({
            res: {
              message: err.message,
              stack: err.stack,
            },
            status: "failed",
            ts: new Date().getTime(),
            guid: guid(),
          });
        }
      });
  }
}
