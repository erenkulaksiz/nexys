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

import { logTypes } from "src/types";
import { API } from "../API";
import { Events } from "../events";
import { InternalLogger } from "./../internalLogger";
import { LocalStorage } from "./../localStorage";
import { LogPool } from "./../logPool";
import { Device } from "./../device";
import { server, debugServer, version } from "../../utils";
import type { NexysOptions } from "../../types";

const defaultOptions = {
  localStorage: {
    useLocalStorage: true,
    cryption: true,
    key: "__nexysLogPool__",
    testKey: "__nexysTest__",
    successRequestsMaxSize: 20,
    failedRequestsMaxSize: 50,
  },
  errors: {
    allowAutomaticHandling: true, // Used for automatic exception handling.
  },
};

export class NexysCore {
  InternalLogger: InternalLogger;
  LogPool: LogPool;
  Events: Events;
  API: API;
  Device: Device;
  LocalStorage: LocalStorage;

  _apiKey: string;
  _version: string = version;
  _server: string = server;
  _logPoolSize: number = 5;
  _options: NexysOptions = defaultOptions;

  // Core
  constructor(API_KEY: string, options?: NexysOptions) {
    // Options
    this._options = {
      ...options,
      localStorage: {
        ...this._options.localStorage,
        ...options?.localStorage,
      },
      errors: {
        ...this._options.errors,
        ...options?.errors,
      },
    };
    this._apiKey = API_KEY;
    this._server = options?.debug ? debugServer : options?.server ?? server;
    this._logPoolSize = options?.logPoolSize ?? this._logPoolSize;

    if (!this._apiKey) throw new Error("NexysCore: API_KEY is not defined");
    if (!this._options.appName)
      throw new Error(
        "NexysCore: Please specify appName in constructor options"
      );

    // Internal Logger
    this.InternalLogger = new InternalLogger(this, {
      active: this._options?.debug || false,
    });

    // LogPool
    this.LogPool = new LogPool(this);

    // Event Handler
    this.Events = new Events(this);
    this.Events.on.error = (event: ErrorEvent) => {
      this.InternalLogger.log("test", event);
    };
    // API
    this.API = new API(this, {
      server: this._server,
      apiKey: this._apiKey,
      appName: this._options.appName,
    });

    // Device
    this.Device = new Device();
    this.LocalStorage = new LocalStorage(this, {
      key: this._options.localStorage?.key ?? defaultOptions.localStorage?.key,
      testKey:
        this._options.localStorage?.testKey ??
        defaultOptions.localStorage?.testKey,
      isEncrypted:
        this._options.localStorage?.cryption ??
        defaultOptions.localStorage?.cryption,
      active:
        this._options.localStorage?.useLocalStorage ??
        defaultOptions.localStorage?.useLocalStorage,
    });

    // Load logs from localStorage
    const localLogs = this.LocalStorage.getLocalLogs();
    if(Array.isArray(localLogs) && localLogs.length > 0 && this._options.localStorage?.useLocalStorage){
      this.LogPool.setLogs(localLogs);
      this.InternalLogger.log("NexysCore: Set logs from localStorage.", localLogs);
    }else if(Array.isArray(localLogs) && localLogs.length == 0 && this._options.localStorage?.useLocalStorage){
      this.InternalLogger.log("NexysCore: LocalStorage is empty, no logs found.");
    }

    // Load requests from localStorage
    const localRequests = this.LocalStorage.getLocalRequests();
    if(Array.isArray(localRequests) && localRequests.length > 0 && this._options.localStorage?.useLocalStorage){
      this.LogPool.setRequests(localRequests);
      this.InternalLogger.log("NexysCore: Set requests from localStorage.", localRequests);
    }else if(Array.isArray(localRequests) && localRequests.length == 0 && this._options.localStorage?.useLocalStorage){
      this.InternalLogger.log("NexysCore: LocalStorage is empty, no requests found.");
    }

    // Core Init Event
    this.Events.on.coreInit?.();

    // Log initialization
    this.InternalLogger.log(
      "NexysCore: Initialized",
      this._version,
      this._options
    );
  }

  /**
   * Adds log request to logPool in Nexys instance.
   *
   * @example
   * ```javascript
   * // Initialize the client and log "Hello World"
   * const nexys = new Nexys("API_KEY", { appName: "My_app" });
   * nexys.log("Hello World");
   * ```
   *
   * ```javascript
   * // Initialize the client and log "Hello World" with options
   * nexys.log("Hello World", { type: "info" });
   * ```
   *
   * @param data - Any data to be logged
   * @param options - `Optional` - Log options specified below
   * @param options.type - `Optional` - Log type
   * @param options.level - `Optional` - Log level
   * @param options.tags - `Optional` - Log tags
   *
   * @public
   */
  public log(data: logTypes["data"], options?: logTypes["options"]) {
    this.LogPool.push({
      data,
      options,
      ts: new Date().getTime(),
    });
  }
}
