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
import { API } from "../API";
import { Events } from "../events";
import { InternalLogger } from "./../internalLogger";
import { LocalStorage } from "./../localStorage";
import { LogPool } from "./../logPool";
import { Device } from "./../device";
import { server, debugServer, version, isClient } from "../../utils";
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
var NexysCore = /** @class */ (function () {
    // Core
    function NexysCore(API_KEY, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        this._version = version;
        this._server = server;
        this._logPoolSize = 5;
        this._options = defaultOptions;
        this._isClient = isClient();
        this._allowDeviceData = true;
        this._sendAllOnType = [
            "AUTO:ERROR",
            "AUTO:UNHANDLEDREJECTION",
        ];
        this._ignoreType = "METRIC";
        this._ignoreTypeSize = 50;
        this._config = {
            user: null,
            client: null,
        };
        // Options
        this._options = __assign(__assign({}, options), { localStorage: __assign(__assign({}, this._options.localStorage), options === null || options === void 0 ? void 0 : options.localStorage), errors: __assign(__assign({}, this._options.errors), options === null || options === void 0 ? void 0 : options.errors) });
        this._apiKey = API_KEY;
        this._server = (options === null || options === void 0 ? void 0 : options.debug) ? debugServer : (_a = options === null || options === void 0 ? void 0 : options.server) !== null && _a !== void 0 ? _a : server;
        this._logPoolSize = (_b = options === null || options === void 0 ? void 0 : options.logPoolSize) !== null && _b !== void 0 ? _b : this._logPoolSize;
        this._allowDeviceData = (_c = options === null || options === void 0 ? void 0 : options.allowDeviceData) !== null && _c !== void 0 ? _c : this._allowDeviceData;
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
        this.InternalLogger = new InternalLogger(this, {
            active: ((_d = this._options) === null || _d === void 0 ? void 0 : _d.debug) || false,
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
            key: (_f = (_e = this._options.localStorage) === null || _e === void 0 ? void 0 : _e.key) !== null && _f !== void 0 ? _f : (_g = defaultOptions.localStorage) === null || _g === void 0 ? void 0 : _g.key,
            testKey: (_j = (_h = this._options.localStorage) === null || _h === void 0 ? void 0 : _h.testKey) !== null && _j !== void 0 ? _j : (_k = defaultOptions.localStorage) === null || _k === void 0 ? void 0 : _k.testKey,
            isEncrypted: (_m = (_l = this._options.localStorage) === null || _l === void 0 ? void 0 : _l.cryption) !== null && _m !== void 0 ? _m : (_o = defaultOptions.localStorage) === null || _o === void 0 ? void 0 : _o.cryption,
            active: (_q = (_p = this._options.localStorage) === null || _p === void 0 ? void 0 : _p.useLocalStorage) !== null && _q !== void 0 ? _q : (_r = defaultOptions.localStorage) === null || _r === void 0 ? void 0 : _r.useLocalStorage,
        });
        // Initialize others
        this.setupEventHandlers();
        this.loadFromLocalStorage();
        if (!this._isClient) {
            this.InternalLogger.log("NexysCore: Detected that we are running NexysCore on non client side environment.");
            this.InternalLogger.log("NexysCore: Altough NexysCore is designed to run on client side, it can be used on server side as well but some features will might not work.");
        }
        // Core Init Event
        (_t = (_s = this.Events.on).coreInit) === null || _t === void 0 ? void 0 : _t.call(_s);
        // Log initialization
        this.InternalLogger.log("NexysCore: Initialized", this._version, this._options);
    }
    /**
     * Automatic error handling.
     */
    NexysCore.prototype.setupEventHandlers = function () {
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
            });
        };
    };
    NexysCore.prototype.loadFromLocalStorage = function () {
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
    NexysCore.prototype.log = function (data, options) {
        this.LogPool.push({
            data: data,
            options: options,
            ts: new Date().getTime(),
        });
    };
    NexysCore.prototype.error = function (data, options) {
        this.LogPool.push({
            data: data,
            options: __assign(__assign({}, options), { type: "ERROR" }),
            ts: new Date().getTime(),
        });
    };
    NexysCore.prototype.metric = function (metric) {
        this.LogPool.push({
            data: metric,
            options: {
                type: "METRIC",
            },
            ts: new Date().getTime(),
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
     *  // Set client version (likely to be your app version)
     *  config.setClient("1.0.0");
     * });
     * ```
     */
    NexysCore.prototype.configure = function (config) {
        var _this = this;
        (function () {
            return typeof config == "function" &&
                config({
                    setUser: function (user) {
                        _this._config.user = user;
                        _this.InternalLogger.log("NexysCore: User configured", user);
                    },
                    setClient: function (client) {
                        _this._config.client = client;
                        _this.InternalLogger.log("NexysCore: Client configured", client);
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
    NexysCore.prototype.clear = function () {
        this.LogPool.clearLogs();
        this.LogPool.clearRequests();
    };
    /**
     * This method will force a request to Nexys.
     *
     * @example
     * ```javascript
     * nexys.forceRequest();
     * ```
     */
    NexysCore.prototype.forceRequest = function () {
        this.LogPool.sendAll();
    };
    return NexysCore;
}());
export { NexysCore };
