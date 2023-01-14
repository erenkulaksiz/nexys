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
        successRequestsMaxSize: 20,
        failedRequestsMaxSize: 50,
    },
    errors: {
        allowAutomaticHandling: true, // Used for automatic exception handling.
    },
};
var NexysCore = /** @class */ (function () {
    // Core
    function NexysCore(API_KEY, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        this._version = version;
        this._server = server;
        this._logPoolSize = 5;
        this._options = defaultOptions;
        this._isClient = isClient();
        this._sendAllOnType = [
            "AUTO:ERROR",
            "AUTO:UNHANDLEDREJECTION",
        ];
        this._config = {
            user: null,
        };
        // Options
        this._options = __assign(__assign({}, options), { localStorage: __assign(__assign({}, this._options.localStorage), options === null || options === void 0 ? void 0 : options.localStorage), errors: __assign(__assign({}, this._options.errors), options === null || options === void 0 ? void 0 : options.errors) });
        this._apiKey = API_KEY;
        this._server = (options === null || options === void 0 ? void 0 : options.debug) ? debugServer : (_a = options === null || options === void 0 ? void 0 : options.server) !== null && _a !== void 0 ? _a : server;
        this._logPoolSize = (_b = options === null || options === void 0 ? void 0 : options.logPoolSize) !== null && _b !== void 0 ? _b : this._logPoolSize;
        this._sendAllOnType =
            typeof (options === null || options === void 0 ? void 0 : options.sendAllOnType) == "undefined"
                ? this._sendAllOnType
                : options === null || options === void 0 ? void 0 : options.sendAllOnType;
        if (!this._apiKey)
            throw new Error("NexysCore: API_KEY is not defined");
        if (!this._options.appName)
            throw new Error("NexysCore: Please specify appName in constructor options");
        // Internal Logger
        this.InternalLogger = new InternalLogger(this, {
            active: ((_c = this._options) === null || _c === void 0 ? void 0 : _c.debug) || false,
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
        this.Device = new Device();
        // LocalStorage
        this.LocalStorage = new LocalStorage(this, {
            key: (_e = (_d = this._options.localStorage) === null || _d === void 0 ? void 0 : _d.key) !== null && _e !== void 0 ? _e : (_f = defaultOptions.localStorage) === null || _f === void 0 ? void 0 : _f.key,
            testKey: (_h = (_g = this._options.localStorage) === null || _g === void 0 ? void 0 : _g.testKey) !== null && _h !== void 0 ? _h : (_j = defaultOptions.localStorage) === null || _j === void 0 ? void 0 : _j.testKey,
            isEncrypted: (_l = (_k = this._options.localStorage) === null || _k === void 0 ? void 0 : _k.cryption) !== null && _l !== void 0 ? _l : (_m = defaultOptions.localStorage) === null || _m === void 0 ? void 0 : _m.cryption,
            active: (_p = (_o = this._options.localStorage) === null || _o === void 0 ? void 0 : _o.useLocalStorage) !== null && _p !== void 0 ? _p : (_q = defaultOptions.localStorage) === null || _q === void 0 ? void 0 : _q.useLocalStorage,
        });
        // Initialize others
        this.setupEventHandlers();
        this.loadFromLocalStorage();
        if (!this._isClient) {
            this.InternalLogger.log("NexysCore: Detected that we are running NexysCore on server side environment.");
            this.InternalLogger.log("NexysCore: Altough NexysCore is designed to run on client side, it can be used on server side as well but some features will might not work.");
        }
        // Core Init Event
        (_s = (_r = this.Events.on).coreInit) === null || _s === void 0 ? void 0 : _s.call(_r);
        // Log initialization
        this.InternalLogger.log("NexysCore: Initialized", this._version, this._options);
    }
    /**
     * Automatic error handling.
     */
    NexysCore.prototype.setupEventHandlers = function () {
        var _this = this;
        this.Events.on.error = function (event) {
            _this.InternalLogger.log("Events: Received error", event);
            var extractedError = {
                message: event.message,
                errmessage: event.error.message,
                stack: event.error.stack,
                type: event.type,
                colno: event.colno,
                lineno: event.lineno,
                filename: event.filename,
                defaultPrevented: event.defaultPrevented,
                isTrusted: event.isTrusted,
                timeStamp: event.timeStamp,
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
            _this.InternalLogger.log("Events: Received unhandledRejection: ", event);
            var extractedRejection = {
                reason: event.reason,
                type: event.type,
                isTrusted: event.isTrusted,
                defaultPrevented: event.defaultPrevented,
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
    /**
     * Configures Nexys instance. All logs sent to Nexys will use these configurations.
     * This method will help you trough identifying your logs where came from like which user or which device.
     *
     * @example
     * ```javascript
     * // Import types (Optional: If TypeScript is being used)
     * import type { configFunctions } from "nexys/dist/src/types";
     * // Set user
     * nexys.configure((config: configFunctions) => {
     *  config.setUser("123456789_UNIQUE_ID");
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
    return NexysCore;
}());
export { NexysCore };
