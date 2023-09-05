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
import { guid } from "../../utils/index.js";
var API = /** @class */ (function () {
    function API(core, _a) {
        var server = _a.server, apiKey = _a.apiKey, appName = _a.appName;
        this._server = "";
        this._apiKey = "";
        this._appName = "";
        this._sendingRequest = false;
        this.core = core;
        this._server = server;
        this._apiKey = apiKey;
        this._appName = appName;
    }
    API.prototype.sendRequest = function (_a) {
        var _b, _c;
        var headers = _a.headers, data = _a.data;
        return __awaiter(this, void 0, void 0, function () {
            var server;
            var _this = this;
            return __generator(this, function (_d) {
                if (!this.checkAvailability())
                    throw new Error("fetch is not defined (node environment)");
                if (this._sendingRequest) {
                    throw new Error("API:ALREADY_SENDING");
                }
                this._sendingRequest = true;
                (_c = (_b = this.core.Events.on.request).sending) === null || _c === void 0 ? void 0 : _c.call(_b, data);
                server = "".concat(this._server, "/api/report/").concat(this._apiKey, "/").concat(this._appName);
                this.core.InternalLogger.log("API: Sending request to server", server);
                return [2 /*return*/, fetch(server, {
                        method: "POST",
                        headers: __assign({ "Content-Type": "application/json" }, headers),
                        body: JSON.stringify(data),
                    }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        var json, err_1;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    json = null;
                                    _c.label = 1;
                                case 1:
                                    _c.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, res.json()];
                                case 2:
                                    json = _c.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_1 = _c.sent();
                                    json = null;
                                    throw new Error("API:FAILED:JSON_PARSE_ERROR");
                                case 4:
                                    if (res === null || res === void 0 ? void 0 : res.ok) {
                                        this.requestCompleted();
                                        (_b = (_a = this.core.Events.on.request).success) === null || _b === void 0 ? void 0 : _b.call(_a, { res: res, json: json });
                                        return [2 /*return*/, {
                                                res: res,
                                                json: json,
                                            }];
                                    }
                                    throw new Error("API:FAILED:".concat(res.status, ":").concat(json === null || json === void 0 ? void 0 : json.error));
                            }
                        });
                    }); })];
            });
        });
    };
    API.prototype.sendData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendRequest({
                        data: data,
                    })
                        .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        var data;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    data = res.json.data;
                                    return [4 /*yield*/, this.core.LocalStorage.setAPIValues(data)];
                                case 1:
                                    _c.sent();
                                    this.core._APIValues = data;
                                    this.core.InternalLogger.log("API: Successful request", res);
                                    (_b = (_a = this.core.Events.on.request).success) === null || _b === void 0 ? void 0 : _b.call(_a, { res: res, json: res.json });
                                    return [4 /*yield*/, this.core.LogPool.clearRequests()];
                                case 2:
                                    _c.sent();
                                    return [4 /*yield*/, this.core.LogPool.clearLogs()];
                                case 3:
                                    _c.sent();
                                    return [2 /*return*/, true];
                            }
                        });
                    }); })
                        .catch(function (err) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    this.core.InternalLogger.error("API: Request failed.", err);
                                    (_b = (_a = this.core.Events.on.request).error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
                                    if ((err === null || err === void 0 ? void 0 : err.message) == "API:FAILED:400:api-key") {
                                        this.core.InternalLogger.error("API: Your API key is not valid. Please make sure you entered correct credentials.");
                                    }
                                    if (!((err === null || err === void 0 ? void 0 : err.message) != "API:ALREADY_SENDING")) return [3 /*break*/, 2];
                                    this.core.API.requestCompleted();
                                    return [4 /*yield*/, this.core.LogPool.pushRequest({
                                            res: {
                                                message: err.message,
                                                stack: err.stack,
                                            },
                                            status: "failed",
                                            ts: new Date().getTime(),
                                            guid: guid(),
                                        })];
                                case 1:
                                    _c.sent();
                                    _c.label = 2;
                                case 2: return [2 /*return*/, false];
                            }
                        });
                    }); })];
            });
        });
    };
    API.prototype.requestCompleted = function () {
        this._sendingRequest = false;
    };
    API.prototype.checkAvailability = function () {
        return typeof fetch !== "undefined";
    };
    return API;
}());
export { API };
