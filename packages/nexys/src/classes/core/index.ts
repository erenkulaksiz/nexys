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

import { API } from "../API/index.js";
import { Events } from "../events/index.js";
import { InternalLogger } from "./../internalLogger/index.js";
import { LocalStorage } from "./../localStorage/index.js";
import { LogPool } from "./../logPool/index.js";
import { Device } from "./../device/index.js";
import {
  server,
  version,
  isClient,
  guid,
  defaultOptions,
} from "../../utils/index.js";
import getPagePath from "../../utils/getPagePath.js";
import type {
  NexysOptions,
  logTypes,
  configTypes,
  configFunctions,
  errorLogTypes,
  requestTypes,
} from "../../types";
import type { APIValues } from "../localStorage/types.js";
import type { getDeviceDataReturnTypes } from "../device/types.js";

export class Core {
  InternalLogger: InternalLogger;
  LogPool: LogPool;
  Events: Events;
  API: API;
  Device: Device;
  LocalStorage: LocalStorage;
  _initialized: boolean = false;
  _processAvailable: boolean = typeof process != "undefined";
  _apiKey: string;
  _version: string = version;
  _server: string = server;
  _logPoolSize: number = 10;
  _options: NexysOptions = defaultOptions;
  _isClient: boolean = isClient();
  _allowDeviceData: boolean = true;
  _allowGeoLocation: boolean = false;
  _allowElementData: boolean = true;
  _env: string = this._processAvailable
    ? process?.env?.NODE_ENV ?? "production"
    : "production";
  _sendAllOnType: NexysOptions["sendAllOnType"] = [
    "ERROR",
    "AUTO:ERROR",
    "AUTO:UNHANDLEDREJECTION",
  ];
  _ignoreType: NexysOptions["ignoreType"] = "METRIC";
  _ignoreTypeSize: number = 50;
  _config: configTypes | null = null;
  _APIValues: APIValues | null = null;
  _useLocalStorageAdapter: boolean = false;

  constructor(API_KEY: string, options?: NexysOptions) {
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
    this._server = options?.server ?? server;
    this._logPoolSize = options?.logPoolSize ?? this._logPoolSize;
    this._allowDeviceData = options?.allowDeviceData ?? this._allowDeviceData;
    this._allowGeoLocation =
      options?.allowGeoLocation ?? this._allowGeoLocation;
    this._allowElementData = typeof options?.allowElementData == "undefined";

    this._sendAllOnType =
      typeof options?.sendAllOnType == "undefined"
        ? this._sendAllOnType
        : options?.sendAllOnType;

    this._ignoreType =
      typeof options?.ignoreType == "undefined"
        ? this._ignoreType
        : options?.ignoreType;

    this._ignoreTypeSize =
      typeof options?.ignoreTypeSize == "undefined"
        ? this._ignoreTypeSize
        : options?.ignoreTypeSize;

    this._useLocalStorageAdapter =
      typeof options?.localStorage?.useAdapter == "undefined"
        ? this._useLocalStorageAdapter
        : options?.localStorage?.useAdapter;

    if (!this._apiKey) throw new Error("NexysCore: API_KEY is not defined");

    if (!this._options.appName)
      throw new Error(
        "NexysCore: Please specify appName in constructor options"
      );
  }

  public _checkInitialized(): boolean {
    if (!this._initialized) {
      console.error(
        "📕 [NEXYS-ERROR]: ",
        "Nexys is not initialized. Please initialize Nexys before using it."
      );
      return false;
    }
    return true;
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/logging/log
   *
   * @description Adds log request to logPool in Nexys instance.
   *
   * @example
   * ```javascript
   * // Create a Nexys instance and log "Hello World"
   * const nexys = new Nexys("API_KEY", { appName: "My_app" });
   * nexys.init();
   * nexys.log("Hello World");
   * ```
   *
   * ```javascript
   * // Log "Hello World" with options
   * nexys.log("Hello World", { type: "info" });
   * ```
   *
   * @param data - Any data to be logged. See types https://github.com/erenkulaksiz/nexys/blob/master/packages/nexys/src/types.ts#L68
   * @param options - `Optional` - `object` - Log options specified below
   * @param options.type - `Optional` - `string` - Log type
   * @param options.level - `Optional` - `string` - Log level
   * @param options.tags - `Optional` - `string[]` - Log tags
   * @param options.action - `Optional` - `string` - Log action
   * @public
   * @returns {Promise<void>} - Returns nothing.
   *
   */
  public async log(
    data: logTypes["data"],
    options?: logTypes["options"]
  ): Promise<void> {
    if (!this._checkInitialized()) {
      return;
    }
    const e = new Error();
    await this.LogPool.push({
      data,
      options,
      stack: e.stack,
      ts: new Date().getTime(),
      guid: guid(),
      path: getPagePath(this),
    });
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/logging/error
   *
   * @description Adds error request to logPool in Nexys instance.
   *
   * @example
   * ```javascript
   * // Create a Nexys instance and log "Hello World"
   * const nexys = new Nexys("API_KEY", { appName: "My_app" });
   * nexys.init();
   * // Error log parameter expects an object
   * nexys.error({ message: "Hello World" });
   * ```
   *
   * @param data - Any data to be logged. See types https://github.com/erenkulaksiz/nexys/blob/master/packages/nexys/src/types.ts#L77
   * @param options - `Optional` - `object` - Log options specified below
   * @param options.type - `Optional` - `string` - Log type
   * @param options.level - `Optional` - `string` - Log level
   * @param options.tags - `Optional` - `string[]` - Log tags
   * @param options.action - `Optional` - `string` - Log action
   * @public
   * @returns {Promise<void>} - Returns nothing.
   *
   */
  public async error(
    data: errorLogTypes["data"],
    options?: logTypes["options"]
  ): Promise<void> {
    if (!this._checkInitialized()) {
      return;
    }
    const e = new Error();
    await this.LogPool.push({
      data,
      options: {
        type: "ERROR",
        ...options,
      },
      stack: e.stack,
      ts: new Date().getTime(),
      guid: guid(),
      path: getPagePath(this),
    });
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/metrics
   *
   * @description `NextJS only method`
   *  Collect metric data for NextJS for performance measuring
   *  The metric data will not affect logPoolSize on default, log types with "METRIC" is ignored by default.
   *  Data collected from metrics will be sent if any request to dashboard happens. We do not want to send metric data on each page load. This will cause your client to get rate limit blocked.
   *  We will add metric support for React soon.
   *
   * @example
   * ```javascript
   * // Create a Nexys instance and initialize it
   * const nexys = new Nexys("API_KEY", { appName: "My_app" });
   * nexys.init();
   * // inside pages/_app.jsx|tsx
   * export function reportWebVitals(metric: NextWebVitalsMetric) {
   *  nexys.metric(metric);
   * }
   * ```
   *
   * @param metric Metric data that you get from calling reportWebVitals in NextJS
   * @public
   * @returns {Promise<void>} - Returns nothing.
   *
   */
  public async metric(metric: {
    id: string;
    label: string;
    name: string;
    startTime: number;
    value: number;
  }): Promise<void> {
    if (!this._checkInitialized()) {
      return;
    }
    const e = new Error();
    await this.LogPool.push({
      data: metric,
      options: {
        type: "METRIC",
      },
      ts: new Date().getTime(),
      guid: guid(),
      stack: e.stack,
      path: getPagePath(this),
    });
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/category/user-configuration
   *
   * @description Configures Nexys instance. All logs sent to Nexys will use these configurations.
   * This method will help you trough identifying your logs where came from like which user or which device.
   *
   * @example
   * ```javascript
   * // Create a Nexys instance and initialize it
   * const nexys = new Nexys("API_KEY", { appName: "My_app" });
   * nexys.init();
   * // Import types of config (Optional: If TypeScript is being used)
   * import type { configFunctions } from "nexys/dist/src/types";
   * // Configure Nexys
   * nexys.configure((config: configFunctions) => {
   *  // Set user
   *  config.setUser("123456789_UNIQUE_ID");
   *  // Set application version (likely to be your app version)
   *  // This config is MUST-to-do because we will analyze each of your versions
   *  config.setAppVersion("1.0.0");
   * });
   * ```
   *
   * @param config - `Required` - `object` - Config functions
   * @param config.setUser - `Optional` - `function` - Set user
   * @param config.setAppVersion - `Optional` - `function` - Set application version
   * @public
   * @returns {void} - Returns nothing.
   *
   */
  public configure(config: (config: configFunctions) => void): void {
    if (!this._checkInitialized()) {
      return;
    }
    (() =>
      typeof config == "function" &&
      config({
        setUser: async (user: string) => {
          this._config = {
            ...this._config,
            user,
          };
          await this.LocalStorage.setUser(user);
          this.InternalLogger.log("NexysCore: User configured", user);
          this.Events.fire("config.user", user);
        },
        setAppVersion: async (appVersion: string) => {
          this._config = {
            ...this._config,
            appVersion,
          };
          this.InternalLogger.log(
            "NexysCore: App version configured",
            appVersion
          );
          this.Events.fire("config.app.version", appVersion);
        },
      }))();
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/clear
   *
   * @description This method will clear whatever stored in Nexys.
   *
   * @example
   * ```javascript
   * nexys.clear();
   * ```
   *
   * @public
   * @returns {void} - Returns nothing.
   *
   */
  public async clear(): Promise<void> {
    if (!this._checkInitialized()) {
      return;
    }
    await this.LogPool.clearLogs();
    await this.LogPool.clearRequests();
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/force-request
   *
   * @description This method will force a request to Nexys.
   * Use this method if you want to send all logs to Nexys immediately.
   * This method is not recommended to use. It will cause your client to get rate limit blocked if you use it too much.
   *
   * @example
   * ```javascript
   * nexys.forceRequest();
   * ```
   *
   * @async - This method is async.
   * @public
   * @returns {Promise<void>} - Returns nothing.
   *
   */
  public async forceRequest(): Promise<void> {
    if (!this._checkInitialized()) {
      return;
    }
    await this.LogPool.sendAll();
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/get-library-version
   *
   * @description This method will return Nexys library version in string.
   *
   * @example
   * ```javascript
   * nexys.getLibraryVersion();
   * ```
   *
   * @public
   * @returns {string} - Returns library version.
   *
   */
  public getLibraryVersion(): string | null {
    if (!this._checkInitialized()) {
      return null;
    }
    return this._version;
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/get-user
   *
   * @description This method will return configured user.
   * If user is not configured, it will return null.
   *
   * @example
   * ```javascript
   * nexys.getUser();
   * ```
   *
   * @public
   * @returns {string | null} - Returns user if configured, otherwise null.
   *
   */
  public getUser(): string | null {
    if (!this._checkInitialized()) {
      return null;
    }
    return this._config?.user ?? null;
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/logpool/get-logpool-length
   *
   * @description This method will return log length in logPool.
   *
   * @example
   * ```javascript
   * nexys.getLogPoolLength();
   * ```
   *
   * @public
   * @returns {number} - Returns log length in logPool.
   *
   */
  public getLogPoolLength(): number {
    if (!this._checkInitialized()) {
      return 0;
    }
    return this.LogPool.logs.length;
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/logpool/get-logpool-log-types
   *
   * @description This method will return log types in logPool. Multiple same types will be counted as one. No-typed logs will not be counted.
   *
   * @example
   * ```javascript
   * nexys.getLogPoolLogTypes();
   * ```
   *
   * @public
   * @returns {string[]} - Returns log types in logPool.
   *
   */
  public getLogPoolLogTypes(): string[] | null {
    if (!this._checkInitialized()) {
      return null;
    }
    let items = {} as { [key: string]: number };
    this.LogPool.logs.forEach((log) => {
      if (log?.options?.type) {
        items[log?.options?.type] = items[log?.options?.type]
          ? items[log?.options?.type] + 1
          : 1;
      }
    });
    return Object.keys(items);
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/logpool/get-logpool-logs
   *
   * @description This method will return logPool logs.
   *
   * @example
   * ```javascript
   * nexys.getLogPoolLogTypes();
   * ```
   *
   * @public
   * @returns {logTypes[]} - Returns logPool logs.
   */
  public getLogPoolLogs(): logTypes[] | null {
    if (!this._checkInitialized()) {
      return null;
    }
    return this.LogPool.logs;
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/logpool/get-logpool-requests
   *
   * @description This method will return requests in logPool. Requests array will be cleared (also on localStorage) after each successful request to Nexys.
   *
   * @example
   * ```javascript
   * nexys.getLogPoolRequests();
   * ```
   *
   * @public
   * @returns {requestTypes[]} - Returns requests in logPool.
   *
   */
  public getLogPoolRequests(): requestTypes[] | null {
    if (!this._checkInitialized()) {
      return null;
    }
    return this.LogPool.requests;
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/get-api-values
   *
   * @description This method will return API values. API values might be null if there is no request to Nexys yet also if there is no localStorage.
   *
   * @example
   * ```javascript
   * nexys.getApiValues();
   * ```
   *
   * @public
   * @returns {APIValues} - Returns APIValues.
   *
   */
  public getApiValues(): APIValues | null {
    if (!this._checkInitialized()) {
      return null;
    }
    return this._APIValues;
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/get-is-initialized
   *
   * @description This method will return if Nexys is initialized or not.
   *
   * @example
   * ```javascript
   * nexys.getIsInitialized();
   * ```
   *
   * @public
   * @returns {boolean} - Returns if Nexys is initialized or not.
   *
   */
  public getIsInitialized(): boolean {
    return this._initialized;
  }

  /**
   *
   * Documentation @see https://docs.nexys.app/functions/get-device-data
   *
   * @description This method will return DeviceData Nexys can gather.
   *
   * @example
   * ```javascript
   * nexys.getDeviceData();
   * ```
   *
   * @async - This method is async.
   * @public
   * @returns {Promise<getDeviceDataReturnTypes>} - Returns DeviceData.
   */
  public async getDeviceData(): Promise<getDeviceDataReturnTypes | null> {
    if (!this._checkInitialized()) {
      return null;
    }
    return await this.Device.getDeviceData();
  }
}
