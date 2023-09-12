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
import { server, version, isClient, guid, defaultOptions, } from "../../utils/index.js";
import getPagePath from "../../utils/getPagePath.js";
var Core = /** @class */ (function () {
    function Core(API_KEY, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this._initialized = false;
        this._processAvailable = typeof process != "undefined";
        this._version = version;
        this._server = server;
        this._logPoolSize = 10;
        this._options = defaultOptions;
        this._isClient = isClient();
        this._allowDeviceData = true;
        this._allowGeoLocation = false;
        this._allowElementData = true;
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
        this._APIValues = null;
        this._useLocalStorageAdapter = false;
        this._options = __assign(__assign({}, options), { localStorage: __assign(__assign({}, this._options.localStorage), options === null || options === void 0 ? void 0 : options.localStorage), errors: __assign(__assign({}, this._options.errors), options === null || options === void 0 ? void 0 : options.errors) });
        this._apiKey = API_KEY;
        this._server = (_c = options === null || options === void 0 ? void 0 : options.server) !== null && _c !== void 0 ? _c : server;
        this._logPoolSize = (_d = options === null || options === void 0 ? void 0 : options.logPoolSize) !== null && _d !== void 0 ? _d : this._logPoolSize;
        this._allowDeviceData = (_e = options === null || options === void 0 ? void 0 : options.allowDeviceData) !== null && _e !== void 0 ? _e : this._allowDeviceData;
        this._allowGeoLocation =
            (_f = options === null || options === void 0 ? void 0 : options.allowGeoLocation) !== null && _f !== void 0 ? _f : this._allowGeoLocation;
        this._allowElementData = typeof (options === null || options === void 0 ? void 0 : options.allowElementData) == "undefined";
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
        this._useLocalStorageAdapter =
            typeof ((_g = options === null || options === void 0 ? void 0 : options.localStorage) === null || _g === void 0 ? void 0 : _g.useAdapter) == "undefined"
                ? this._useLocalStorageAdapter
                : (_h = options === null || options === void 0 ? void 0 : options.localStorage) === null || _h === void 0 ? void 0 : _h.useAdapter;
        if (!this._apiKey)
            throw new Error("NexysCore: API_KEY is not defined");
        if (!this._options.appName)
            throw new Error("NexysCore: Please specify appName in constructor options");
    }
    Core.prototype._checkInitialized = function () {
        if (!this._initialized) {
            console.error("📕 [NEXYS-ERROR]: ", "Nexys is not initialized. Please initialize Nexys before using it.");
            return false;
        }
        return true;
    };
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
    Core.prototype.log = function (data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._checkInitialized()) {
                            return [2 /*return*/];
                        }
                        e = new Error();
                        return [4 /*yield*/, this.LogPool.push({
                                data: data,
                                options: options,
                                stack: e.stack,
                                ts: new Date().getTime(),
                                guid: guid(),
                                path: getPagePath(this),
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
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
    Core.prototype.error = function (data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._checkInitialized()) {
                            return [2 /*return*/];
                        }
                        e = new Error();
                        return [4 /*yield*/, this.LogPool.push({
                                data: data,
                                options: __assign({ type: "ERROR" }, options),
                                stack: e.stack,
                                ts: new Date().getTime(),
                                guid: guid(),
                                path: getPagePath(this),
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
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
    Core.prototype.metric = function (metric) {
        return __awaiter(this, void 0, void 0, function () {
            var e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._checkInitialized()) {
                            return [2 /*return*/];
                        }
                        e = new Error();
                        return [4 /*yield*/, this.LogPool.push({
                                data: metric,
                                options: {
                                    type: "METRIC",
                                },
                                ts: new Date().getTime(),
                                guid: guid(),
                                stack: e.stack,
                                path: getPagePath(this),
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
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
    Core.prototype.configure = function (config) {
        var _this = this;
        if (!this._checkInitialized()) {
            return;
        }
        (function () {
            return typeof config == "function" &&
                config({
                    setUser: function (user) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this._config = __assign(__assign({}, this._config), { user: user });
                                    return [4 /*yield*/, this.LocalStorage.setUser(user)];
                                case 1:
                                    _a.sent();
                                    this.InternalLogger.log("NexysCore: User configured", user);
                                    this.Events.fire("config.user", user);
                                    return [2 /*return*/];
                            }
                        });
                    }); },
                    setAppVersion: function (appVersion) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this._config = __assign(__assign({}, this._config), { appVersion: appVersion });
                            this.InternalLogger.log("NexysCore: App version configured", appVersion);
                            this.Events.fire("config.app.version", appVersion);
                            return [2 /*return*/];
                        });
                    }); },
                });
        })();
    };
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
    Core.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._checkInitialized()) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.LogPool.clearLogs()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.LogPool.clearRequests()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
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
    Core.prototype.forceRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._checkInitialized()) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.LogPool.sendAll()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
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
    Core.prototype.getLibraryVersion = function () {
        if (!this._checkInitialized()) {
            return null;
        }
        return this._version;
    };
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
    Core.prototype.getUser = function () {
        var _a, _b;
        if (!this._checkInitialized()) {
            return null;
        }
        return (_b = (_a = this._config) === null || _a === void 0 ? void 0 : _a.user) !== null && _b !== void 0 ? _b : null;
    };
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
    Core.prototype.getLogPoolLength = function () {
        if (!this._checkInitialized()) {
            return 0;
        }
        return this.LogPool.logs.length;
    };
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
    Core.prototype.getLogPoolLogTypes = function () {
        if (!this._checkInitialized()) {
            return null;
        }
        var items = {};
        this.LogPool.logs.forEach(function (log) {
            var _a, _b, _c, _d;
            if ((_a = log === null || log === void 0 ? void 0 : log.options) === null || _a === void 0 ? void 0 : _a.type) {
                items[(_b = log === null || log === void 0 ? void 0 : log.options) === null || _b === void 0 ? void 0 : _b.type] = items[(_c = log === null || log === void 0 ? void 0 : log.options) === null || _c === void 0 ? void 0 : _c.type]
                    ? items[(_d = log === null || log === void 0 ? void 0 : log.options) === null || _d === void 0 ? void 0 : _d.type] + 1
                    : 1;
            }
        });
        return Object.keys(items);
    };
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
    Core.prototype.getLogPoolLogs = function () {
        if (!this._checkInitialized()) {
            return null;
        }
        return this.LogPool.logs;
    };
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
    Core.prototype.getLogPoolRequests = function () {
        if (!this._checkInitialized()) {
            return null;
        }
        return this.LogPool.requests;
    };
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
    Core.prototype.getApiValues = function () {
        if (!this._checkInitialized()) {
            return null;
        }
        return this._APIValues;
    };
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
    Core.prototype.getIsInitialized = function () {
        return this._initialized;
    };
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
    Core.prototype.getDeviceData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._checkInitialized()) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.Device.getDeviceData()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Core;
}());
export { Core };
