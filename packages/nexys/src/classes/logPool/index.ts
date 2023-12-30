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

import { guid, getPagePath } from "../../utils/index.js";
import { collectData } from "../../utils/collect.js";
import type { requestTypes } from "../../types";
import type { logTypes } from "./../../types";
import type { Core } from "../core/index.js";

export class LogPool {
  private core: Core;
  // All logs stored here.
  public logs: logTypes[] = [];
  public requests: requestTypes[] = [];

  constructor(core: Core) {
    this.core = core;
    this.core.Events.fire("logpool.init");
  }

  public setLogs(logs: logTypes[]): void {
    if (!Array.isArray(logs))
      throw new Error("LogPool: setLogs() expects an array.");
    // Checking if logs has timestamps and data.
    logs.forEach((log: logTypes) => {
      if (!log.ts || !log.data || !log.guid)
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
      if (!request?.res || !request?.status || !request?.ts || !request?.guid)
        throw new Error("LogPool: setRequests() expects an array of requests.");
    });
    this.requests = requests;
    // Also process logs.
    this.process();
  }

  public async push({
    data,
    options,
    ts,
    guid,
    path,
    stack,
  }: logTypes): Promise<void> {
    const log = {
      data,
      options,
      ts,
      guid,
      path,
      stack,
    };
    this.logs.push(log);
    this.process();
    this.core.Events.fire("log.add", log);
    await this.core.LocalStorage.addToLogPool(log);
  }

  public async pushRequest({
    res,
    status,
    ts,
    guid,
  }: requestTypes): Promise<void> {
    const req = {
      res,
      status,
      ts,
      guid,
    };
    this.core.InternalLogger.log(
      "LogPool: Pushing request to requests array.",
      req
    );
    this.requests.push(req);
    this.core.Events.fire("request.add", req);
    await this.core.LocalStorage.addToRequest(req);
  }

  public async clearLogs(): Promise<void> {
    this.logs = [];
    await this.core.LocalStorage.clearLogPool();
    this.core.Events.fire("logs.clear");
    this.core.InternalLogger.log("LogPool: Cleared logs.");
  }

  public async clearRequests(): Promise<void> {
    this.requests = [];
    await this.core.LocalStorage.clearRequests();
    this.core.Events.fire("requests.clear");
    this.core.InternalLogger.log("LogPool: Cleared requests.");
  }

  /**
   * Process internal data to determine whether or not we should need to send data to the server.
   */
  public async process(): Promise<void> {
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
            await this.sendAll();
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
            await this.sendAll();
            break;
          }
        }
      }
    }

    let logsLength = 0;

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

    this.core.Events.fire("logpool.process");
    this.sendAll();
  }

  /**
   * Sends all data on Nexys to the server.
   */
  public async sendAll(): Promise<void> {
    let _start: number | null = null,
      _end: number | null = null;
    if (this.core._isClient) _start = performance.now();
    this.core.InternalLogger.log("LogPool: sendAll() called.");

    if (this.logs.length === 0 && this.requests.length === 0) {
      this.core.InternalLogger.error("LogPool: No logs or requests to send.");
      return;
    }

    let CollectData = await collectData(this.core);

    if (!CollectData) {
      this.core.InternalLogger.error("LogPool: collectData() returned null.");
      return;
    }

    CollectData = {
      ...CollectData,
      logs: this.logs,
      requests: this.requests,
    };

    this.core.InternalLogger.log(
      "LogPool: Sending data to the server.",
      CollectData
    );

    const sent = await this.core.API.sendData(CollectData);

    if (this.core._isClient) _end = performance.now();

    if (_start && _end && sent) {
      await this.core.LogPool.push({
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
  }
}
