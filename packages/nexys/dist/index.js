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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { Core } from "./classes/core/index.js";
import { API } from "./classes/API/index.js";
import { Events } from "./classes/events/index.js";
import { InternalLogger } from "./classes/internalLogger/index.js";
import { LocalStorage } from "./classes/localStorage/index.js";
import { LogPool } from "./classes/logPool/index.js";
import { Device } from "./classes/device/index.js";
import loadFromLocalStorage from "./classes/core/loadFromLocalStorage.js";
import checkVersion from "./classes/core/checkVersion.js";
import { guid } from "./utils/guid.js";
import { getPagePath, defaultOptions } from "./utils/index.js";
/**
 * Nexys Client Library
 *
 * @remarks This package coordinates the communication between the Nexys client library and dashboard server.
 * @packageDocumentation
 */
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
var Nexys = /** @class */ (function (_super) {
    __extends(Nexys, _super);
    /**
     *
     * Documentation
     * @see https://docs.nexys.app
     *
     * Creates a Nexys instance that can be used anywhere in your application.
     *
     * @example
     * ```javascript
     * // Import the client
     * import Nexys from "nexys";
     * // Create a new instance
     * const nexys = new Nexys("API_KEY", { appName: "My_app" });
     * // Initialize the client
     * nexys.init()
     * // Push a log
     * nexys.log("Hello World");
     * ```
     *
     * @param API_KEY - `Required` - `string` - The Public API key you retrieve from our dashboard
     * @param options - `Required` - `object` - Object containing all options below
     * @param options.appName - `Required` - `string` - Name of your application
     * @param options.debug - `Optional` - `boolean` - Enables debug mode for internal logs - Default is `false`
     * @param options.logPoolSize - `Optional` - `number` - Sets the logPool max log size to send when logPool size exceedes this limit - Default is `10`
     * @param options.sendAllOnType - `Optional` - `logOptionTypes | logOptionTypes[] | false` - Ignores logPoolSize when any log with specified type is recieved sends data to API - Default is `["AUTO:ERROR", "AUTO:UNHANDLEDREJECTION", "ERROR"]`
     * @param options.ignoreType - `Optional` - `logOptionTypes | logOptionTypes[] | false` - Ignores logs with specified type (these logs will not count as log and not affect logPool length but will be sent if any request be made) - Default is `"METRIC"`
     * @param options.ignoreTypeSize - `Optional` - `number` - Determine max length of ignored log types could be stored in logPool before sending request - Keeping this number high is preferred - Default is `50`
     * @param options.server - `Optional` - `string` - Change logging server - Default is `https://dash.nexys.app`
     * @param options.allowDeviceData - `Optional` - `boolean` - Should send device data - Collects device data - Default is `true`
     * @param options.allowGeoLocation - `Optional` - `boolean` - Should send geolocation data - Disable if you dont want your users to get notified for geolocation - Default is `false`
     * @param options.allowElementData - `Optional` - `boolean` - Should send body element data - Collects body element data - Default is `true`
     * @param options.clickTrack - `Optional` - `boolean` - Should track clicks - Default is `true`
     * @param options.localStorage - `Optional` - `object` - Object containing options about localStorage
     * @param options.localStorage.useLocalStorage - `Optional` - `boolean` - Should use localStorage - Nexys will try to use localStorage if available if value is true - Default is `true`
     * @param options.localStorage.cryption - `Optional` - `boolean` - Should use cryption on localStorage - Default is `true`
     * @param options.localStorage.key - `Optional` - `string` - Change localStorage key - Default is `__nexysLogPool__`
     * @param options.localStorage.testKey - `Optional` - `string` - Use a different localStorage key for testing localStorage availability - Default is `__nexysTest__`
     * @param options.errors - `Optional` - `object` - Object containing error related options
     * @param options.errors.allowAutomaticHandling - `Optional` - `boolean` - Set automatic error handling - Default is `true`
     *
     * @returns A Nexys instance
     */
    function Nexys(API_KEY, options) {
        return _super.call(this, API_KEY, options) || this;
    }
    /**
     * Initializes the client.
     *
     * @example
     * ```javascript
     * // Create a new instance
     * const nexys = new Nexys("API_KEY", { appName: "My_app" });
     * // Initialize the client
     * nexys.init()
     * ```
     *
     * @public
     * @returns {void} - Returns nothing.
     *
     */
    Nexys.prototype.init = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (this._initialized) {
            this.InternalLogger.log("NexysCore: Already initialized but called nexys.init()");
            return;
        }
        var _start = null, _end = null;
        if (this._isClient)
            _start = performance.now();
        this.InternalLogger = new InternalLogger({
            active: (_b = (_a = this._options) === null || _a === void 0 ? void 0 : _a.debug) !== null && _b !== void 0 ? _b : false,
        });
        this.Events = new Events(this);
        this.LogPool = new LogPool(this);
        this.API = new API(this, {
            server: this._server,
            apiKey: this._apiKey,
            appName: this._options.appName || "",
        });
        this.Device = new Device(this);
        this.LocalStorage = new LocalStorage(this, {
            key: (_d = (_c = this._options.localStorage) === null || _c === void 0 ? void 0 : _c.key) !== null && _d !== void 0 ? _d : (_e = defaultOptions.localStorage) === null || _e === void 0 ? void 0 : _e.key,
            testKey: (_g = (_f = this._options.localStorage) === null || _f === void 0 ? void 0 : _f.testKey) !== null && _g !== void 0 ? _g : (_h = defaultOptions.localStorage) === null || _h === void 0 ? void 0 : _h.testKey,
            isEncrypted: (_k = (_j = this._options.localStorage) === null || _j === void 0 ? void 0 : _j.cryption) !== null && _k !== void 0 ? _k : (_l = defaultOptions.localStorage) === null || _l === void 0 ? void 0 : _l.cryption,
            active: (_o = (_m = this._options.localStorage) === null || _m === void 0 ? void 0 : _m.useLocalStorage) !== null && _o !== void 0 ? _o : (_p = defaultOptions.localStorage) === null || _p === void 0 ? void 0 : _p.useLocalStorage,
        });
        Promise.resolve(this.LocalStorage.setup()).then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadFromLocalStorage(this)];
                    case 1:
                        _a.sent();
                        checkVersion(this);
                        return [2 /*return*/];
                }
            });
        }); });
        this._initialized = true;
        if (!this._isClient) {
            this.InternalLogger.log("NexysCore: Detected that we are running NexysCore on non client side environment.");
            this.InternalLogger.log("NexysCore: Altough NexysCore is designed to run on client side, it can be used on server side as well but some features will might not work.");
        }
        // Core Init Event
        this.Events.fire("core.init");
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
    };
    return Nexys;
}(Core));
export default Nexys;
