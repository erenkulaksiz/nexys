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
var LogPool = /** @class */ (function () {
    function LogPool(core) {
        // All logs stored here.
        this.logs = [];
        this.requests = [];
        this.core = core;
    }
    LogPool.prototype.setLogs = function (logs) {
        if (!Array.isArray(logs))
            throw new Error("LogPool: setLogs() expects an array.");
        // Checking if logs has timestamps and data.
        logs.forEach(function (log) {
            if (!log.ts)
                throw new Error("LogPool: setLogs() expects an array of logs.");
            if (!log.data)
                throw new Error("LogPool: setLogs() expects an array of logs.");
        });
        this.logs = logs;
        this.process();
    };
    LogPool.prototype.setRequests = function (requests) {
        if (!Array.isArray(requests))
            throw new Error("LogPool: setRequests() expects an array.");
        // Checking if requests has timestamps and data.
        requests.forEach(function (request) {
            if (!(request === null || request === void 0 ? void 0 : request.res))
                throw new Error("LogPool: setRequests() expects an array of requests.");
            if (!(request === null || request === void 0 ? void 0 : request.status))
                throw new Error("LogPool: setRequests() expects an array of requests.");
            if (!(request === null || request === void 0 ? void 0 : request.ts))
                throw new Error("LogPool: setRequests() expects an array of requests.");
        });
        this.requests = requests;
        // Also process logs.
        this.process();
    };
    LogPool.prototype.push = function (_a) {
        var _b, _c;
        var data = _a.data, options = _a.options, ts = _a.ts;
        this.logs.push({
            data: data,
            ts: ts,
            options: options,
        });
        this.process();
        (_c = (_b = this.core.Events.on).logAdd) === null || _c === void 0 ? void 0 : _c.call(_b, { data: data, options: options, ts: ts });
        this.core.LocalStorage.addToLogPool({ data: data, options: options, ts: ts });
    };
    LogPool.prototype.pushRequest = function (_a) {
        var _b, _c;
        var res = _a.res, status = _a.status, ts = _a.ts;
        this.core.InternalLogger.log("LogPool: Pushing request to requests array.", res, status, ts);
        this.requests.push({
            res: res,
            status: status,
            ts: ts,
        });
        (_c = (_b = this.core.Events.on).requestAdd) === null || _c === void 0 ? void 0 : _c.call(_b, { res: res, status: status, ts: ts });
        this.core.LocalStorage.addToRequest({ res: res, status: status, ts: ts });
    };
    LogPool.prototype.clearLogs = function () {
        var _a, _b;
        this.logs = [];
        this.core.LocalStorage.clearLogPool();
        (_b = (_a = this.core.Events.on).logsClear) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.core.InternalLogger.log("LogPool: Cleared logs.");
    };
    LogPool.prototype.clearRequests = function () {
        var _a, _b;
        this.requests = [];
        this.core.LocalStorage.clearRequests();
        (_b = (_a = this.core.Events.on).requestsClear) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.core.InternalLogger.log("LogPool: Cleared requests.");
    };
    /**
     * Process internal data to determine whether or not we should need to send data to the server.
     */
    LogPool.prototype.process = function () {
        var _a, _b;
        this.core.InternalLogger.log("LogPool: Processing logs...");
        if (this.logs.length > 0 && this.core._logPoolSize != 0) {
            var sendAllOnType = this.core._sendAllOnType;
            if (!sendAllOnType)
                return;
            // Check if sendAllOnType is array or string.
            if (Array.isArray(sendAllOnType)) {
                // Array
                for (var i = 0; i < this.logs.length; i++) {
                    var log = this.logs[i];
                    if (!((_a = log === null || log === void 0 ? void 0 : log.options) === null || _a === void 0 ? void 0 : _a.type))
                        continue;
                    if (this.core.API._sendingRequest)
                        continue;
                    if (sendAllOnType.includes(log.options.type)) {
                        this.core.InternalLogger.log("LogPool: sendAllOnType is array and log includes ".concat(log.options.type, " type."));
                        this.sendAll();
                        break;
                    }
                }
            }
            else {
                // String
                for (var i = 0; i < this.logs.length; i++) {
                    var log = this.logs[i];
                    if (!((_b = log === null || log === void 0 ? void 0 : log.options) === null || _b === void 0 ? void 0 : _b.type))
                        continue;
                    if (this.core.API._sendingRequest)
                        continue;
                    if (log.options.type == sendAllOnType) {
                        this.core.InternalLogger.log("LogPool: sendAllOnType is string and log is ".concat(log.options.type, " type."));
                        this.sendAll();
                        break;
                    }
                }
            }
        }
        if (this.logs.length < this.core._logPoolSize) {
            this.core.InternalLogger.log("LogPool: logPoolSize is ".concat(this.core._logPoolSize, " but logs length is ").concat(this.logs.length));
            return;
        }
        if (this.core.API._sendingRequest) {
            this.core.InternalLogger.log("LogPool: Already sending all logs to the server.");
            return;
        }
        this.sendAll();
    };
    /**
     * Sends everything to the server.
     */
    LogPool.prototype.sendAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deviceData, config;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.core.InternalLogger.log("LogPool: sendAll() called.");
                        return [4 /*yield*/, this.core.Device.getDeviceData().catch(function (err) { return null; } // If we can't get device data, we don't need to send it.
                            )];
                    case 1:
                        deviceData = _a.sent();
                        config = this.core._config;
                        this.core.API.sendRequest({
                            data: {
                                logs: this.logs,
                                requests: this.requests,
                                deviceData: deviceData,
                                config: config,
                            },
                        })
                            .then(function (res) {
                            var _a, _b;
                            _this.core.InternalLogger.log("burda success olmasi lazim", res);
                            (_b = (_a = _this.core.Events.on.request).success) === null || _b === void 0 ? void 0 : _b.call(_a, res);
                            _this.clearRequests();
                            _this.clearLogs();
                        })
                            .catch(function (err) {
                            var _a, _b;
                            _this.core.InternalLogger.log("API: Request failed.", err);
                            (_b = (_a = _this.core.Events.on.request).error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
                            if (err.message !== "API:ALREADY_SENDING") {
                                _this.core.API.requestCompleted();
                                _this.pushRequest({
                                    res: {
                                        message: err.message,
                                        stack: err.stack,
                                    },
                                    status: "failed",
                                    ts: new Date().getTime(),
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return LogPool;
}());
export { LogPool };
