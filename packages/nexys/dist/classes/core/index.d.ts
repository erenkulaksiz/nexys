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
import type { NexysOptions, logTypes, configTypes, configFunctions, errorLogTypes, requestTypes } from "../../types";
import type { APIValues } from "../localStorage/types.js";
import type { getDeviceDataReturnTypes } from "../device/types.js";
export declare class Core {
    InternalLogger: InternalLogger;
    LogPool: LogPool;
    Events: Events;
    API: API;
    Device: Device;
    LocalStorage: LocalStorage;
    _initialized: boolean;
    _processAvailable: boolean;
    _apiKey: string;
    _version: string;
    _server: string;
    _logPoolSize: number;
    _options: NexysOptions;
    _isClient: boolean;
    _allowDeviceData: boolean;
    _allowGeoLocation: boolean;
    _allowElementData: boolean;
    _env: string;
    _sendAllOnType: NexysOptions["sendAllOnType"];
    _ignoreType: NexysOptions["ignoreType"];
    _ignoreTypeSize: number;
    _config: configTypes | null;
    _APIValues: APIValues | null;
    _useLocalStorageAdapter: boolean;
    constructor(API_KEY: string, options?: NexysOptions);
    private _checkInitialized;
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
     * @public
     * @returns {void} - Returns nothing.
     *
     */
    log(data: logTypes["data"], options?: logTypes["options"]): Promise<void>;
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
     * @public
     * @returns {void} - Returns nothing.
     *
     */
    error(data: errorLogTypes["data"], options?: logTypes["options"]): Promise<void>;
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
     * @public
     * @returns {void} - Returns nothing.
     *
     */
    metric(metric: {
        id: string;
        label: string;
        name: string;
        startTime: number;
        value: number;
    }): Promise<void>;
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
     *
     * @param config - Config functions
     * @param config.setUser - Set user
     * @param config.setAppVersion - Set application version
     * @public
     * @returns {void} - Returns nothing.
     *
     */
    configure(config: (config: configFunctions) => void): void;
    /**
     * This method will clear whatever stored in Nexys.
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
    clear(): Promise<void>;
    /**
     * This method will force a request to Nexys.
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
    forceRequest(): Promise<void>;
    /**
     * This method will return Nexys library version in string.
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
    getLibraryVersion(): string;
    /**
     * This method will return configured user.
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
    getUser(): string | null;
    /**
     * This method will return log length in logPool.
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
    getLogPoolLength(): number;
    /**
     * This method will return log types in logPool. Multiple same types will be counted as one. No-typed logs will not be counted.
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
    getLogPoolLogTypes(): string[];
    /**
     * This method will return logPool logs.
     *
     * @example
     * ```javascript
     * nexys.getLogPoolLogTypes();
     * ```
     *
     * @public
     * @returns {logTypes[]} - Returns logPool logs.
     */
    getLogPoolLogs(): logTypes[];
    /**
     * This method will return requests in logPool. Requests array will be cleared (also on localStorage) after each successful request to Nexys.
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
    getLogPoolRequests(): requestTypes[];
    /**
     * This method will return API values. API values might be null if there is no request to Nexys yet also if there is no localStorage.
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
    getApiValues(): APIValues | null;
    /**
     * This method will return if Nexys is initialized or not.
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
    getIsInitialized(): boolean;
    /**
     * This method will return DeviceData Nexys can gather.
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
    getDeviceData(): Promise<getDeviceDataReturnTypes>;
}
//# sourceMappingURL=index.d.ts.map