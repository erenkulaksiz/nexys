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
import { server, version, isClient, guid } from "../../utils/index.js";
import loadFromLocalStorage from "./loadFromLocalStorage.js";
import getPagePath from "../../utils/getPagePath.js";
import type {
  NexysOptions,
  logTypes,
  configTypes,
  configFunctions,
  errorLogTypes,
} from "../../types";

const defaultOptions = {
  // NexysOptions
  localStorage: {
    useLocalStorage: true,
    cryption: true,
    key: "__nexysLogPool__",
    testKey: "__nexysTest__",
  },
  errors: {
    allowAutomaticHandling: true, // Used for automatic exception handling.
  },
};

export class Core {
  InternalLogger: InternalLogger;
  LogPool: LogPool;
  Events: Events;
  API: API;
  Device: Device;
  LocalStorage: LocalStorage;

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
  _internalMetrics: any = [];

  // Core
  constructor(API_KEY: string, options?: NexysOptions) {
    let _start: number | null = null,
      _end: number | null = null;
    if (this._isClient) _start = performance.now();
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

    if (!this._apiKey) throw new Error("NexysCore: API_KEY is not defined");
    if (!this._options.appName)
      throw new Error(
        "NexysCore: Please specify appName in constructor options"
      );

    // Internal Logger
    this.InternalLogger = new InternalLogger({
      active: this._options?.debug ?? false,
    });

    // LogPool
    this.LogPool = new LogPool(this);

    // Event Handler
    this.Events = new Events(this);

    // API
    this.API = new API(this, {
      server: this._server,
      apiKey: this._apiKey,
      appName: this._options.appName,
    });

    // Device
    this.Device = new Device(this);

    // LocalStorage
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

    loadFromLocalStorage(this);

    if (!this._isClient) {
      this.InternalLogger.log(
        "NexysCore: Detected that we are running NexysCore on non client side environment."
      );
      this.InternalLogger.log(
        "NexysCore: Altough NexysCore is designed to run on client side, it can be used on server side as well but some features will might not work."
      );
    }

    // Core Init Event
    this.Events.on.coreInit?.();

    // Log initialization
    this.InternalLogger.log(
      "NexysCore: Initialized",
      this._version,
      this._options
    );

    if (this._isClient) _end = performance.now();
    if (_start && _end) {
      this.LogPool.push({
        data: {
          type: "CORE:INIT",
          diff: _end - _start,
        },
        ts: new Date().getTime(),
        options: {
          type: "METRIC",
        },
        guid: guid(),
        path: getPagePath(this),
      });
      this.InternalLogger.log(`NexysCore: Initialized in ${_end - _start}ms`);
    }
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
   * @param options.action - `Optional` - Log action
   *
   * @public
   */
  public log(data: logTypes["data"], options?: logTypes["options"]) {
    const e = new Error();
    this.LogPool.push({
      data,
      options,
      stack: e.stack,
      ts: new Date().getTime(),
      guid: guid(),
      path: getPagePath(this),
    });
  }

  /**
   * Adds error request to logPool in Nexys instance.
   *
   * @example
   * ```javascript
   * // Initialize the client and log "Hello World"
   * const nexys = new Nexys("API_KEY", { appName: "My_app" });
   * nexys.log("Hello World");
   * ```
   *
   * ```javascript
   * // Initialize the client and give error
   * nexys.error("I'm an error");
   * ```
   *
   * @param data - Any data to be logged
   * @param options - `Optional` - Log options specified below
   * @param options.type - `Optional` - Log type
   * @param options.level - `Optional` - Log level
   * @param options.tags - `Optional` - Log tags
   * @param options.action - `Optional` - Log action
   *
   * @public
   */
  public error(data: errorLogTypes["data"], options?: logTypes["options"]) {
    const e = new Error();
    this.LogPool.push({
      data,
      options: {
        ...options,
        type: "ERROR",
      },
      stack: e.stack,
      ts: new Date().getTime(),
      guid: guid(),
      path: getPagePath(this),
    });
  }

  /**
   * `NextJS only method`
   *  Collect metric data for NextJS for performance measuring
   *  The metric data will not affect logPoolSize on default, log types with "METRIC" is ignored by default.
   *  Data collected from metrics will be sent if any request to dashboard happens. We do not want to send metric data on each page load. This will cause your client to get rate limit blocked.
   *  We will add metric support for React soon.
   *
   * @example
   * ```javascript
   * // Initialize the client
   * const nexys = new Nexys("API_KEY", { appName: "My_app" });
   * // inside pages/_app.jsx|tsx
   * export function reportWebVitals(metric: NextWebVitalsMetric) {
   *  nexys.metric(metric);
   * }
   * ```
   *
   * @param metric Metric data that you get from calling reportWebVitals in NextJS
   */
  public metric(metric: {
    id: string;
    label: string;
    name: string;
    startTime: number;
    value: number;
  }) {
    const e = new Error();
    this.LogPool.push({
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
   * Configures Nexys instance. All logs sent to Nexys will use these configurations.
   * This method will help you trough identifying your logs where came from like which user or which device.
   *
   * @example
   * ```javascript
   * // Import and initialize the client
   * import Nexys from "nexys";
   *
   * const nexys = new Nexys("API_KEY", { appName: "My_app" });
   *
   * // Import types of config (Optional: If TypeScript is being used)
   * import type { configFunctions } from "nexys/dist/src/types";
   *
   * nexys.configure((config: configFunctions) => {
   *  // Set user
   *  config.setUser("123456789_UNIQUE_ID");
   *  // Set application version (likely to be your app version)
   *  // This config is MUST-to-do because we will analyze each of your versions
   *  config.setAppVersion("1.0.0");
   * });
   * ```
   */
  public configure(config: (config: configFunctions) => void) {
    (() =>
      typeof config == "function" &&
      config({
        setUser: (user: string) => {
          this._config = {
            ...this._config,
            user,
          };
          this.InternalLogger.log("NexysCore: User configured", user);
        },
        setClient: (client: string) => {
          this._config = {
            ...this._config,
            client,
          };
          this.InternalLogger.log("NexysCore: Client configured", client);
        },
        setAppVersion: (appVersion: string) => {
          this._config = {
            ...this._config,
            appVersion,
          };
          this.InternalLogger.log(
            "NexysCore: App version configured",
            appVersion
          );
        },
      }))();
  }

  /**
   * This method will clear whatever stored in Nexys.
   *
   * @example
   * ```javascript
   * nexys.clear();
   * ```
   */
  public clear() {
    this.LogPool.clearLogs();
    this.LogPool.clearRequests();
  }

  /**
   * This method will force a request to Nexys.
   * Use this method if you want to send all logs to Nexys immediately.
   * This method is not recommended to use. It will cause your client to get rate limit blocked if you use it too much.
   *
   * @example
   * ```javascript
   * nexys.forceRequest();
   * ```
   */
  public async forceRequest() {
    await this.LogPool.sendAll();
  }
}
