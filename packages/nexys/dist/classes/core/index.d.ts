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
import type { NexysOptions, logTypes, configTypes, configFunctions } from "../../types";
export declare class Core {
    InternalLogger: InternalLogger;
    LogPool: LogPool;
    Events: Events;
    API: API;
    Device: Device;
    LocalStorage: LocalStorage;
    _processAvailable: boolean;
    _apiKey: string;
    _version: string;
    _server: string;
    _logPoolSize: number;
    _options: NexysOptions;
    _isClient: boolean;
    _allowDeviceData: boolean;
    _allowGeoLocation: boolean;
    _env: string;
    _sendAllOnType: NexysOptions["sendAllOnType"];
    _ignoreType: NexysOptions["ignoreType"];
    _ignoreTypeSize: number;
    _config: configTypes | null;
    _internalMetrics: any;
    constructor(API_KEY: string, options?: NexysOptions);
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
    log(data: logTypes["data"], options?: logTypes["options"]): void;
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
     *
     * @public
     */
    error(data: logTypes["data"], options?: logTypes["options"]): void;
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
     * // inside /pages/_app.jsx|tsx
     * export function reportWebVitals(metric: NextWebVitalsMetric) {
     *  nexys.metric(metric);
     * }
     * ```
     *
     * @param metric Metric data that you get from calling reportWebVitals in NextJS
     */
    metric(metric: {
        id: string;
        label: string;
        name: string;
        startTime: number;
        value: number;
    }): void;
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
    configure(config: (config: configFunctions) => void): void;
    /**
     * This method will clear whatever stored in Nexys.
     *
     * @example
     * ```javascript
     * nexys.clear();
     * ```
     */
    clear(): void;
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
    forceRequest(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map