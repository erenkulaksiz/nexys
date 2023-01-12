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
import type { logTypes } from './../../types';

export class LogPool {
  private core: NexysCore;
  // All logs stored here.
  public logs: logTypes[] = [];
  public requests: requestTypes[] = [];

  constructor(core: NexysCore) {
    this.core = core;
  }

  public setLogs(logs: logTypes[]): void {
    if(!Array.isArray(logs)) throw new Error("LogPool: setLogs() expects an array.");
    // Checking if logs has timestamps and data.
    logs.forEach((log: logTypes) => {
      if(!log.ts) throw new Error("LogPool: setLogs() expects an array of logs.");
      if(!log.data) throw new Error("LogPool: setLogs() expects an array of logs.");
    })
    this.logs = logs;
    this.process();
  }

  public setRequests(requests: requestTypes[]): void {
    if(!Array.isArray(requests)) throw new Error("LogPool: setRequests() expects an array.");
    // Checking if requests has timestamps and data.
    requests.forEach((request: requestTypes) => {
      if(!request?.res) throw new Error("LogPool: setRequests() expects an array of requests.");
      if(!request?.status) throw new Error("LogPool: setRequests() expects an array of requests.");
      if(!request?.ts) throw new Error("LogPool: setRequests() expects an array of requests.");
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
    this.core.InternalLogger.log("LogPool: Clearing logs...");
  }

  public clearRequests(): void {
    this.requests = [];
    this.core.LocalStorage.clearRequests();
    this.core.Events.on.requestsClear?.();
    this.core.InternalLogger.log("LogPool: Clearing requests...");
  }

  /**
   * Process internal data to determine whether or not we should need to send data to the server.
   */
  public process(): void {
    this.core.InternalLogger.log("LogPool: Processing logs...");
    this.core.InternalLogger.log(
      "LogPool: logPoolSize is ",
      this.core._logPoolSize,
      " but logs length is ",
      this.logs.length
    );

    /*
    if(this.core._options.sendAllOnType){}
    */

    if (this.logs.length < this.core._logPoolSize) {
      this.core.InternalLogger.log(
        `LogPool: logPoolSize is ${this.core._logPoolSize} but logs length is ${this.logs.length}`
      );
      return;
    }

    this.sendAll();
  }

  /**
   * Sends everything to the server.
   */
  private async sendAll() {
    this.core.InternalLogger.log("LogPool: Sending all logs to the server...");
    const deviceData = await this.core.Device.getDeviceData();
    this.core.API.sendRequest({
      data: {
        logs: this.logs,
        requests: this.requests,
        deviceData,
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
