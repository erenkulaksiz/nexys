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
        while (_) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { request, server, version } from "./utils";
/**
 * Nexys Client
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
var Nexys = /** @class */ (function () {
    /**
     * Creates a Nexys instance that can be used anywhere in your application.
     *
     *  * @example
     * ```javascript
     * // Initialize the client
     * const nexys = new Nexys("API_KEY");
     * ```
     *
     * @param API_KEY - The Public API key you retrieve from our dashboard
     * @param options - Object containing all options below
     * @param options.debug - Enables debug mode for internal logs
     * @param options.logPoolSize - Sets the logPool max log size to send when logPool size exceedes this limit
     * @param options.sendAllOnType - Ignores logPoolSize when any log with specified type is recieved, then sends all logs
     * @param options.server - Change logging server
     */
    function Nexys(API_KEY, options) {
        this._server = server;
        this._version = version;
        this._options = {
            debug: false,
            logPoolSize: 0,
            sendAllOnType: null,
        };
        this._logPool = [];
        // Recieved from API
        this._hardUpdate = false; // Determine if library needs to be hard updated
        this._softUpdate = false; // Determina if library needs to be soft updated
        this._apiKey = API_KEY;
        this._options = options || {};
        if (options === null || options === void 0 ? void 0 : options.server) {
            this._server = options === null || options === void 0 ? void 0 : options.server;
        }
    }
    /**
     * Adds log request to logPool in Nexys instance.
     *
     * @example
     * ```javascript
     * // Initialize the client and log "Hello World"
     * const nexys = new Nexys("API_KEY");
     * nexys.log("Hello World");
     * ```
     *
     * @param data - Any data to be logged
     * @param options - Log options specified below
     * @param options.type - Log type
     * @param options.level - Log level
     * @param options.tags - Log tags
     *
     * @returns - Returns a promise that resolves to "SUCCESS" or "ERROR"
     *
     * @public
     */
    Nexys.prototype.log = function (data, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._internalLog(data, options);
                return [2 /*return*/, this.pushLog({ data: data, options: options })];
            });
        });
    };
    /**
     * Logs all details about Nexys instance. Just dont use it.
     */
    Nexys.prototype.__DO_NOT_USE_THIS = function () {
        this._internalLog(this._apiKey, this._options, this._server, this._version, this._logPool);
    };
    Nexys.prototype.setOptions = function (options) {
        this._options = __assign(__assign({}, this._options), options);
    };
    Nexys.prototype._internalLog = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (((_a = this._options) === null || _a === void 0 ? void 0 : _a.debug) != true)
            return;
        console.log.apply(console, __spreadArray(["[NEXYS-DEBUG]: "], args, false));
    };
    Nexys.prototype.pushLog = function (_a) {
        var data = _a.data, options = _a.options;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this._logPool.push({ data: data, options: options });
                return [2 /*return*/, this.processLogPool()];
            });
        });
    };
    Nexys.prototype.processLogPool = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                if (this._logPool.length == 0) {
                    throw new Error("Logpool size is 0 in Nexys");
                }
                this._internalLog("Checking internal data", this._apiKey, this._server, this._version);
                if (!this._apiKey || this._apiKey.length == 0) {
                    throw new Error("No apiKey specified in Nexys constructor");
                }
                if (!this._server) {
                    throw new Error("Invalid server key in Nexys");
                }
                if (!this._version) {
                    throw new Error("Invalid version key in Nexys");
                }
                if (this._options.sendAllOnType) {
                    // Check if theres any logs with specified sendAllOnType option.
                    this._logPool.forEach(function (_a) {
                        var data = _a.data, options = _a.options;
                        if (!options || !options.type)
                            return;
                        if (Array.isArray(_this._options.sendAllOnType)) {
                            if (_this._options.sendAllOnType.includes(options.type)) {
                                // Send request
                                _this._internalLog("Sending request due to sendAllOnType", _this._options.sendAllOnType);
                                return _this.sendRequest({
                                    data: _this._logPool,
                                });
                            }
                            return;
                        }
                        if (_this._options.sendAllOnType == options.type) {
                            // Send request
                            _this._internalLog("Sending request due to sendAllOnType", _this._options.sendAllOnType);
                            return _this.sendRequest({
                                data: _this._logPool,
                            });
                        }
                    });
                }
                if ((_a = this._options) === null || _a === void 0 ? void 0 : _a.logPoolSize) {
                    // there is logPoolSize option
                    if (this._logPool.length < this._options.logPoolSize) {
                        this._internalLog("Added log to logPool");
                        return [2 /*return*/, Promise.resolve("SUCCESS:ADD_LOGPOOL")];
                    }
                    this._internalLog("Sending request due to logPool size exceeded");
                    return [2 /*return*/, this.sendRequest({
                            data: this._logPool,
                        })];
                }
                this._internalLog("Sending request due to no logPool size");
                // no logPoolSize option
                return [2 /*return*/, this.sendRequest({
                        data: {
                            data: this._logPool[0].data,
                            options: this._logPool[0].options,
                        },
                    })];
            });
        });
    };
    Nexys.prototype.sendRequest = function (_a) {
        var _this = this;
        var data = _a.data;
        return request({
            server: this._server,
            url: "log",
            method: "POST",
            apiKey: this._apiKey,
            body: data,
        }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._logPool = [];
                        if (!(res.status == 200)) return [3 /*break*/, 2];
                        return [4 /*yield*/, res.json()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, res];
                }
            });
        }); });
    };
    return Nexys;
}());
export default Nexys;
