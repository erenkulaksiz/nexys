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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { API } from "../API/index.js";
import { Events } from "../events/index.js";
import { InternalLogger } from "./../internalLogger/index.js";
import { LocalStorage } from "./../localStorage/index.js";
import { LogPool } from "./../logPool/index.js";
import { Device } from "./../device/index.js";
import { server, version, isClient, guid } from "../../utils/index.js";
var defaultOptions = {
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
var Core = /** @class */ (function () {
    // Core
    function Core(API_KEY, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        this._env = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "production";
        this._version = version;
        this._server = server;
        this._logPoolSize = 10;
        this._options = defaultOptions;
        this._isClient = isClient();
        this._allowDeviceData = true;
        this._allowGeoLocation = true;
        this._sendAllOnType = [
            "ERROR",
            "AUTO:ERROR",
            "AUTO:UNHANDLEDREJECTION",
        ];
        this._ignoreType = "METRIC";
        this._ignoreTypeSize = 50;
        this._config = null;
        this._internalMetrics = [];
        var _start = null, _end = null;
        if (this._isClient)
            _start = performance.now();
        // Options
        this._options = __assign(__assign({}, options), { localStorage: __assign(__assign({}, this._options.localStorage), options === null || options === void 0 ? void 0 : options.localStorage), errors: __assign(__assign({}, this._options.errors), options === null || options === void 0 ? void 0 : options.errors) });
        this._apiKey = API_KEY;
        this._server = (_b = options === null || options === void 0 ? void 0 : options.server) !== null && _b !== void 0 ? _b : server;
        this._logPoolSize = (_c = options === null || options === void 0 ? void 0 : options.logPoolSize) !== null && _c !== void 0 ? _c : this._logPoolSize;
        this._allowDeviceData = (_d = options === null || options === void 0 ? void 0 : options.allowDeviceData) !== null && _d !== void 0 ? _d : this._allowDeviceData;
        this._allowGeoLocation =
            (_e = options === null || options === void 0 ? void 0 : options.allowGeoLocation) !== null && _e !== void 0 ? _e : this._allowGeoLocation;
        this._sendAllOnType =
            typeof (options === null || options === void 0 ? void 0 : options.sendAllOnType) == "undefined"
                ? this._sendAllOnType
                : options === null || options === void 0 ? void 0 : options.sendAllOnType;
        this._ignoreType =
            typeof (options === null || options === void 0 ? void 0 : options.ignoreType) == "undefined"
                ? this._ignoreType
                : options === null || options === void 0 ? void 0 : options.ignoreType;
        this._ignoreTypeSize =
            typeof (options === null || options === void 0 ? void 0 : options.ignoreTypeSize) == "undefined"
                ? this._ignoreTypeSize
                : options === null || options === void 0 ? void 0 : options.ignoreTypeSize;
        if (!this._apiKey)
            throw new Error("NexysCore: API_KEY is not defined");
        if (!this._options.appName)
            throw new Error("NexysCore: Please specify appName in constructor options");
        // Internal Logger
        this.InternalLogger = new InternalLogger({
            active: (_g = (_f = this._options) === null || _f === void 0 ? void 0 : _f.debug) !== null && _g !== void 0 ? _g : false,
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
            key: (_j = (_h = this._options.localStorage) === null || _h === void 0 ? void 0 : _h.key) !== null && _j !== void 0 ? _j : (_k = defaultOptions.localStorage) === null || _k === void 0 ? void 0 : _k.key,
            testKey: (_m = (_l = this._options.localStorage) === null || _l === void 0 ? void 0 : _l.testKey) !== null && _m !== void 0 ? _m : (_o = defaultOptions.localStorage) === null || _o === void 0 ? void 0 : _o.testKey,
            isEncrypted: (_q = (_p = this._options.localStorage) === null || _p === void 0 ? void 0 : _p.cryption) !== null && _q !== void 0 ? _q : (_r = defaultOptions.localStorage) === null || _r === void 0 ? void 0 : _r.cryption,
            active: (_t = (_s = this._options.localStorage) === null || _s === void 0 ? void 0 : _s.useLocalStorage) !== null && _t !== void 0 ? _t : (_u = defaultOptions.localStorage) === null || _u === void 0 ? void 0 : _u.useLocalStorage,
        });
        // Initialize others
        this.setupEventHandlers();
        this.loadFromLocalStorage();
        if (!this._isClient) {
            this.InternalLogger.log("NexysCore: Detected that we are running NexysCore on non client side environment.");
            this.InternalLogger.log("NexysCore: Altough NexysCore is designed to run on client side, it can be used on server side as well but some features will might not work.");
        }
        // Core Init Event
        (_w = (_v = this.Events.on).coreInit) === null || _w === void 0 ? void 0 : _w.call(_v);
        // Log initialization
        this.InternalLogger.log("NexysCore: Initialized", this._version, this._options);
        if (this._isClient)
            _end = performance.now();
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
                path: this.getPagePath(),
            });
            this.InternalLogger.log("NexysCore: Initialized in ".concat(_end - _start, "ms"));
        }
    }
    /**
     * Automatic error handling.
     */
    Core.prototype.setupEventHandlers = function () {
        var _this = this;
        this.Events.on.error = function (event) {
            var _a, _b;
            _this.InternalLogger.log("Events: Received error", event);
            var extractedError = {
                message: event === null || event === void 0 ? void 0 : event.message,
                errmessage: (_a = event === null || event === void 0 ? void 0 : event.error) === null || _a === void 0 ? void 0 : _a.message,
                stack: (_b = event === null || event === void 0 ? void 0 : event.error) === null || _b === void 0 ? void 0 : _b.stack,
                type: event === null || event === void 0 ? void 0 : event.type,
                colno: event === null || event === void 0 ? void 0 : event.colno,
                lineno: event === null || event === void 0 ? void 0 : event.lineno,
                filename: event === null || event === void 0 ? void 0 : event.filename,
                defaultPrevented: event === null || event === void 0 ? void 0 : event.defaultPrevented,
                isTrusted: event === null || event === void 0 ? void 0 : event.isTrusted,
                timeStamp: event === null || event === void 0 ? void 0 : event.timeStamp,
            };
            _this.LogPool.push({
                data: __assign({}, extractedError),
                ts: new Date().getTime(),
                options: {
                    type: "AUTO:ERROR",
                },
                guid: guid(),
                path: _this.getPagePath(),
            });
        };
        this.Events.on.unhandledRejection = function (event) {
            var _a, _b;
            _this.InternalLogger.log("Events: Received unhandledRejection: ", event);
            var extractedRejection = {
                message: (_a = event === null || event === void 0 ? void 0 : event.reason) === null || _a === void 0 ? void 0 : _a.message,
                stack: (_b = event === null || event === void 0 ? void 0 : event.reason) === null || _b === void 0 ? void 0 : _b.stack,
                type: event === null || event === void 0 ? void 0 : event.type,
                isTrusted: event === null || event === void 0 ? void 0 : event.isTrusted,
                defaultPrevented: event === null || event === void 0 ? void 0 : event.defaultPrevented,
                timeStamp: event === null || event === void 0 ? void 0 : event.timeStamp,
            };
            _this.LogPool.push({
                data: __assign({}, extractedRejection),
                ts: new Date().getTime(),
                options: {
                    type: "AUTO:UNHANDLEDREJECTION",
                },
                guid: guid(),
                path: _this.getPagePath(),
            });
        };
        this.Events.on.request.success = function (event) {
            _this.InternalLogger.log("Events: Received request success: ", event);
        };
        this.Events.on.request.error = function (event) {
            var messages = {
                "API:FAILED:400:app-name": "NexysCore: Your configured app name and the app name you entered on your project is mismatching. Please check your configuration. Erasing localStorage.",
                "API:FAILED:400:not-verified": "NexysCore: Your project is not verified. Erasing localStorage.",
                "API:FAILED:400:domain": "NexysCore: This domain is not allowed. Enable localhost access on your project if you are testing. Erasing localStorage.",
            };
            var message = messages[event.message];
            if (message) {
                _this.InternalLogger.log(message);
                _this.LocalStorage.clear();
                _this.LogPool.clearLogs();
                _this.LogPool.clearRequests();
                return;
            }
            _this.InternalLogger.log("Events: Received request error: ", event);
        };
    };
    Core.prototype.getPagePath = function () {
        if (this._isClient) {
            if (window === null || window === void 0 ? void 0 : window.location) {
                return window.location.pathname;
            }
            return null;
        }
        return null;
    };
    Core.prototype.loadFromLocalStorage = function () {
        var _a, _b, _c, _d;
        // Load logs from localStorage
        var localLogs = this.LocalStorage.getLocalLogs();
        if (Array.isArray(localLogs) &&
            localLogs.length > 0 &&
            ((_a = this._options.localStorage) === null || _a === void 0 ? void 0 : _a.useLocalStorage)) {
            this.LogPool.setLogs(localLogs);
            this.InternalLogger.log("NexysCore: Set logs from localStorage.", localLogs);
        }
        else if (Array.isArray(localLogs) &&
            localLogs.length == 0 &&
            ((_b = this._options.localStorage) === null || _b === void 0 ? void 0 : _b.useLocalStorage)) {
            this.InternalLogger.log("NexysCore: LocalStorage is empty, no logs found.");
        }
        // Load requests from localStorage
        var localRequests = this.LocalStorage.getLocalRequests();
        if (Array.isArray(localRequests) &&
            localRequests.length > 0 &&
            ((_c = this._options.localStorage) === null || _c === void 0 ? void 0 : _c.useLocalStorage)) {
            this.LogPool.setRequests(localRequests);
            this.InternalLogger.log("NexysCore: Set requests from localStorage.", localRequests);
        }
        else if (Array.isArray(localRequests) &&
            localRequests.length == 0 &&
            ((_d = this._options.localStorage) === null || _d === void 0 ? void 0 : _d.useLocalStorage)) {
            this.InternalLogger.log("NexysCore: LocalStorage is empty, no requests found.");
        }
    };
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
    Core.prototype.log = function (data, options) {
        this.LogPool.push({
            data: data,
            options: options,
            ts: new Date().getTime(),
            guid: guid(),
            path: this.getPagePath(),
        });
    };
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
    Core.prototype.error = function (data, options) {
        this.LogPool.push({
            data: data,
            options: __assign(__assign({}, options), { type: "ERROR" }),
            ts: new Date().getTime(),
            guid: guid(),
            path: this.getPagePath(),
        });
    };
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
    Core.prototype.metric = function (metric) {
        this.LogPool.push({
            data: metric,
            options: {
                type: "METRIC",
            },
            ts: new Date().getTime(),
            guid: guid(),
            path: this.getPagePath(),
        });
    };
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
    Core.prototype.configure = function (config) {
        var _this = this;
        (function () {
            return typeof config == "function" &&
                config({
                    setUser: function (user) {
                        _this._config = __assign(__assign({}, _this._config), { user: user });
                        _this.InternalLogger.log("NexysCore: User configured", user);
                    },
                    setClient: function (client) {
                        _this._config = __assign(__assign({}, _this._config), { client: client });
                        _this.InternalLogger.log("NexysCore: Client configured", client);
                    },
                    setAppVersion: function (appVersion) {
                        _this._config = __assign(__assign({}, _this._config), { appVersion: appVersion });
                        _this.InternalLogger.log("NexysCore: App version configured", appVersion);
                    },
                });
        })();
    };
    /**
     * This method will clear whatever stored in Nexys.
     *
     * @example
     * ```javascript
     * nexys.clear();
     * ```
     */
    Core.prototype.clear = function () {
        this.LogPool.clearLogs();
        this.LogPool.clearRequests();
    };
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
    Core.prototype.forceRequest = function () {
        this.LogPool.sendAll();
    };
    return Core;
}());
export { Core };
