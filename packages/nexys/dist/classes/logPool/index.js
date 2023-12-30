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
import { guid, getPagePath } from "../../utils/index.js";
import { collectData } from "../../utils/collect.js";
var LogPool = /** @class */ (function () {
    function LogPool(core) {
        // All logs stored here.
        this.logs = [];
        this.requests = [];
        this.core = core;
        this.core.Events.fire("logpool.init");
    }
    LogPool.prototype.setLogs = function (logs) {
        if (!Array.isArray(logs))
            throw new Error("LogPool: setLogs() expects an array.");
        // Checking if logs has timestamps and data.
        logs.forEach(function (log) {
            if (!log.ts || !log.data || !log.guid)
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
            if (!(request === null || request === void 0 ? void 0 : request.res) || !(request === null || request === void 0 ? void 0 : request.status) || !(request === null || request === void 0 ? void 0 : request.ts) || !(request === null || request === void 0 ? void 0 : request.guid))
                throw new Error("LogPool: setRequests() expects an array of requests.");
        });
        this.requests = requests;
        // Also process logs.
        this.process();
    };
    LogPool.prototype.push = function (_a) {
        var data = _a.data, options = _a.options, ts = _a.ts, guid = _a.guid, path = _a.path, stack = _a.stack;
        return __awaiter(this, void 0, void 0, function () {
            var log;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log = {
                            data: data,
                            options: options,
                            ts: ts,
                            guid: guid,
                            path: path,
                            stack: stack,
                        };
                        this.logs.push(log);
                        this.process();
                        this.core.Events.fire("log.add", log);
                        return [4 /*yield*/, this.core.LocalStorage.addToLogPool(log)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LogPool.prototype.pushRequest = function (_a) {
        var res = _a.res, status = _a.status, ts = _a.ts, guid = _a.guid;
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        req = {
                            res: res,
                            status: status,
                            ts: ts,
                            guid: guid,
                        };
                        this.core.InternalLogger.log("LogPool: Pushing request to requests array.", req);
                        this.requests.push(req);
                        this.core.Events.fire("request.add", req);
                        return [4 /*yield*/, this.core.LocalStorage.addToRequest(req)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LogPool.prototype.clearLogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logs = [];
                        return [4 /*yield*/, this.core.LocalStorage.clearLogPool()];
                    case 1:
                        _a.sent();
                        this.core.Events.fire("logs.clear");
                        this.core.InternalLogger.log("LogPool: Cleared logs.");
                        return [2 /*return*/];
                }
            });
        });
    };
    LogPool.prototype.clearRequests = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.requests = [];
                        return [4 /*yield*/, this.core.LocalStorage.clearRequests()];
                    case 1:
                        _a.sent();
                        this.core.Events.fire("requests.clear");
                        this.core.InternalLogger.log("LogPool: Cleared requests.");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Process internal data to determine whether or not we should need to send data to the server.
     */
    LogPool.prototype.process = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var sendAllOnType, i, log, i, log, logsLength, diffLength;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.core.InternalLogger.log("LogPool: Processing logs...");
                        if (!(this.logs.length > 0 && this.core._logPoolSize != 0)) return [3 /*break*/, 9];
                        sendAllOnType = this.core._sendAllOnType;
                        if (!sendAllOnType)
                            return [2 /*return*/];
                        if (!Array.isArray(sendAllOnType)) return [3 /*break*/, 5];
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < this.logs.length)) return [3 /*break*/, 4];
                        log = this.logs[i];
                        if (!((_a = log === null || log === void 0 ? void 0 : log.options) === null || _a === void 0 ? void 0 : _a.type))
                            return [3 /*break*/, 3];
                        if (this.core.API._sendingRequest)
                            return [3 /*break*/, 3];
                        if (!sendAllOnType.includes(log.options.type)) return [3 /*break*/, 3];
                        this.core.InternalLogger.log("LogPool: sendAllOnType is array and log includes ".concat(log.options.type, " type."));
                        return [4 /*yield*/, this.sendAll()];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        i = 0;
                        _c.label = 6;
                    case 6:
                        if (!(i < this.logs.length)) return [3 /*break*/, 9];
                        log = this.logs[i];
                        if (!((_b = log === null || log === void 0 ? void 0 : log.options) === null || _b === void 0 ? void 0 : _b.type))
                            return [3 /*break*/, 8];
                        if (this.core.API._sendingRequest)
                            return [3 /*break*/, 8];
                        if (!(log.options.type == sendAllOnType)) return [3 /*break*/, 8];
                        this.core.InternalLogger.log("LogPool: sendAllOnType is string and log is ".concat(log.options.type, " type."));
                        return [4 /*yield*/, this.sendAll()];
                    case 7:
                        _c.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9:
                        logsLength = 0;
                        logsLength = this.logs.filter(function (log) {
                            var _a;
                            if (!((_a = log === null || log === void 0 ? void 0 : log.options) === null || _a === void 0 ? void 0 : _a.type))
                                return true;
                            if (Array.isArray(_this.core._ignoreType) &&
                                _this.core._ignoreType.includes(log.options.type))
                                return false;
                            if (typeof _this.core._ignoreType == "string" &&
                                _this.core._ignoreType == log.options.type)
                                return false;
                            return true;
                        }).length;
                        diffLength = this.logs.length - logsLength;
                        if (diffLength > this.core._ignoreTypeSize) {
                            this.core.InternalLogger.log("LogPool: diffLength (this.logs.length - logsLength): ".concat(diffLength, " ignoreTypeSize: ").concat(this.core._ignoreTypeSize, " - Ignored logs max reached."));
                            logsLength += diffLength;
                        }
                        else {
                            this.core.InternalLogger.log("LogPool: Ignoring ".concat(diffLength, " logs. ignoreType: ").concat(this.core._ignoreType, " ignoreTypeSize: ").concat(this.core._ignoreTypeSize));
                        }
                        if (logsLength < this.core._logPoolSize) {
                            this.core.InternalLogger.log("LogPool: logPoolSize is ".concat(this.core._logPoolSize, " but logs length is ").concat(logsLength));
                            return [2 /*return*/];
                        }
                        if (this.core.API._sendingRequest) {
                            this.core.InternalLogger.log("LogPool: Already sending request to the server.");
                            return [2 /*return*/];
                        }
                        this.core.Events.fire("logpool.process");
                        this.sendAll();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sends all data on Nexys to the server.
     */
    LogPool.prototype.sendAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _start, _end, CollectData, sent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _start = null, _end = null;
                        if (this.core._isClient)
                            _start = performance.now();
                        this.core.InternalLogger.log("LogPool: sendAll() called.");
                        if (this.logs.length === 0 && this.requests.length === 0) {
                            this.core.InternalLogger.error("LogPool: No logs or requests to send.");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, collectData(this.core)];
                    case 1:
                        CollectData = _a.sent();
                        if (!CollectData) {
                            this.core.InternalLogger.error("LogPool: collectData() returned null.");
                            return [2 /*return*/];
                        }
                        CollectData = __assign(__assign({}, CollectData), { logs: this.logs, requests: this.requests });
                        this.core.InternalLogger.log("LogPool: Sending data to the server.", CollectData);
                        return [4 /*yield*/, this.core.API.sendData(CollectData)];
                    case 2:
                        sent = _a.sent();
                        if (this.core._isClient)
                            _end = performance.now();
                        if (!(_start && _end && sent)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.core.LogPool.push({
                                data: {
                                    type: "LOGPOOL:SENDALL",
                                    diff: _end - _start,
                                },
                                ts: new Date().getTime(),
                                options: {
                                    type: "METRIC",
                                },
                                guid: guid(),
                                path: getPagePath(this.core),
                            })];
                    case 3:
                        _a.sent();
                        this.core.InternalLogger.log("API: Request took ".concat(_end - _start, "ms."));
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LogPool;
}());
export { LogPool };
