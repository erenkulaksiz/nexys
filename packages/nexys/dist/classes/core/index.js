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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { API } from "../API/index.js";
import { Events } from "../events/index.js";
import { InternalLogger } from "./../internalLogger/index.js";
import { LocalStorage } from "./../localStorage/index.js";
import { LogPool } from "./../logPool/index.js";
import { Device } from "./../device/index.js";
import { server, version, isClient, guid } from "../../utils/index.js";
import setupEventHandlers from "./setupEventHandlers.js";
import loadFromLocalStorage from "./loadFromLocalStorage.js";
import getPagePath from "../../utils/getPagePath.js";
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        this._processAvailable = typeof process != "undefined";
        this._version = version;
        this._server = server;
        this._logPoolSize = 10;
        this._options = defaultOptions;
        this._isClient = isClient();
        this._allowDeviceData = true;
        this._allowGeoLocation = false;
        this._env = this._processAvailable
            ? (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) !== null && _b !== void 0 ? _b : "production"
            : "production";
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
        this._server = (_c = options === null || options === void 0 ? void 0 : options.server) !== null && _c !== void 0 ? _c : server;
        this._logPoolSize = (_d = options === null || options === void 0 ? void 0 : options.logPoolSize) !== null && _d !== void 0 ? _d : this._logPoolSize;
        this._allowDeviceData = (_e = options === null || options === void 0 ? void 0 : options.allowDeviceData) !== null && _e !== void 0 ? _e : this._allowDeviceData;
        this._allowGeoLocation =
            (_f = options === null || options === void 0 ? void 0 : options.allowGeoLocation) !== null && _f !== void 0 ? _f : this._allowGeoLocation;
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
            active: (_h = (_g = this._options) === null || _g === void 0 ? void 0 : _g.debug) !== null && _h !== void 0 ? _h : false,
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
            key: (_k = (_j = this._options.localStorage) === null || _j === void 0 ? void 0 : _j.key) !== null && _k !== void 0 ? _k : (_l = defaultOptions.localStorage) === null || _l === void 0 ? void 0 : _l.key,
            testKey: (_o = (_m = this._options.localStorage) === null || _m === void 0 ? void 0 : _m.testKey) !== null && _o !== void 0 ? _o : (_p = defaultOptions.localStorage) === null || _p === void 0 ? void 0 : _p.testKey,
            isEncrypted: (_r = (_q = this._options.localStorage) === null || _q === void 0 ? void 0 : _q.cryption) !== null && _r !== void 0 ? _r : (_s = defaultOptions.localStorage) === null || _s === void 0 ? void 0 : _s.cryption,
            active: (_u = (_t = this._options.localStorage) === null || _t === void 0 ? void 0 : _t.useLocalStorage) !== null && _u !== void 0 ? _u : (_v = defaultOptions.localStorage) === null || _v === void 0 ? void 0 : _v.useLocalStorage,
        });
        // Initialize others
        setupEventHandlers(this);
        loadFromLocalStorage(this);
        if (!this._isClient) {
            this.InternalLogger.log("NexysCore: Detected that we are running NexysCore on non client side environment.");
            this.InternalLogger.log("NexysCore: Altough NexysCore is designed to run on client side, it can be used on server side as well but some features will might not work.");
        }
        // Core Init Event
        (_x = (_w = this.Events.on).coreInit) === null || _x === void 0 ? void 0 : _x.call(_w);
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
                path: getPagePath(this),
            });
            this.InternalLogger.log("NexysCore: Initialized in ".concat(_end - _start, "ms"));
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
    Core.prototype.log = function (data, options) {
        var e = new Error();
        this.LogPool.push({
            data: data,
            options: options,
            stack: e.stack,
            ts: new Date().getTime(),
            guid: guid(),
            path: getPagePath(this),
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
        var e = new Error();
        this.LogPool.push({
            data: data,
            options: __assign(__assign({}, options), { type: "ERROR" }),
            stack: e.stack,
            ts: new Date().getTime(),
            guid: guid(),
            path: getPagePath(this),
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
        var e = new Error();
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.LogPool.sendAll()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Core;
}());
export { Core };
