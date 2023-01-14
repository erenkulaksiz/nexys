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

import { NexysCore } from "../core";
import type { LogPoolConstructorParams } from "./types";
import type { requestTypes } from "../../types";
import type { logTypes } from "./../../types";

export class LogPool {
  private core: NexysCore;
  // All logs stored here.
  public logs: logTypes[] = [];
  public requests: requestTypes[] = [];

  constructor(core: NexysCore) {
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
    });
    this.requests = requests;
    // Also process logs.
    this.process();
  }

  public push({ data, options, ts }: logTypes): void {
    this.logs.push({
      data,
      ts,
      options,
    });
    this.process();
    this.core.Events.on.logAdd?.({ data, options, ts });
    this.core.LocalStorage.addToLogPool({ data, options, ts });
  }

  private pushRequest({ res, status, ts }: requestTypes): void {
    this.core.InternalLogger.log(
      "LogPool: Pushing request to requests array.",
      res,
      status,
      ts
    );
    this.requests.push({
      res,
      status,
      ts,
    });
    this.core.Events.on.requestAdd?.({ res, status, ts });
    this.core.LocalStorage.addToRequest({ res, status, ts });
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

    if (this.logs.length < this.core._logPoolSize) {
      this.core.InternalLogger.log(
        `LogPool: logPoolSize is ${this.core._logPoolSize} but logs length is ${this.logs.length}`
      );
      return;
    }

    if (this.core.API._sendingRequest) {
      this.core.InternalLogger.log(
        "LogPool: Already sending all logs to the server."
      );
      return;
    }

    this.sendAll();
  }

  /**
   * Sends everything to the server.
   */
  private async sendAll() {
    this.core.InternalLogger.log("LogPool: sendAll() called.");
    const deviceData = await this.core.Device.getDeviceData().catch(
      (err) => null // If we can't get device data, we don't need to send it.
    );
    const config = this.core._config;
    this.core.API.sendRequest({
      data: {
        logs: this.logs,
        requests: this.requests,
        deviceData,
        config,
      },
    })
      .then((res) => {
        this.core.InternalLogger.log("burda success olmasi lazim", res);
        this.core.Events.on.request.success?.(res);
        this.clearRequests();
        this.clearLogs();
      })
      .catch((err) => {
        this.core.InternalLogger.log("API: Request failed.", err);
        this.core.Events.on.request.error?.(err);
        if (err.message !== "API:ALREADY_SENDING") {
          this.core.API.requestCompleted();
          this.pushRequest({
            res: {
              message: err.message,
              stack: err.stack,
            },
            status: "failed",
            ts: new Date().getTime(),
          });
        }
      });
  }
}
