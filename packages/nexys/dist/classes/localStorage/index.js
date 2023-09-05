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
import { Base64 } from "../../utils/index.js";
/**
 * @class LocalStorage
 * @description This class is used to handle internal localStorage operations.
 */
var LocalStorage = /** @class */ (function () {
    function LocalStorage(core, _a) {
        var key = _a.key, testKey = _a.testKey, isEncrypted = _a.isEncrypted, active = _a.active;
        var _b, _c;
        this._localStorage = null;
        this.isActive = false;
        this.isEncrypted = false;
        this.isAvailable = false;
        this.key = "__nex__";
        this.testKey = "__nex-t__";
        this.shouldUseLocalStorage = false;
        this.core = core;
        if (core._useLocalStorageAdapter) {
            if (typeof ((_b = this.core._options.localStorage) === null || _b === void 0 ? void 0 : _b.adapter) != "undefined") {
                this._localStorage = (_c = this.core._options.localStorage) === null || _c === void 0 ? void 0 : _c.adapter;
                this.core.InternalLogger.log("LocalStorage: Adapter", this._localStorage);
            }
            else {
                this._localStorage = this.core._isClient ? window === null || window === void 0 ? void 0 : window.localStorage : null;
                this.core.InternalLogger.error("LocalStorage: Using localStorage adapter fallback. (window.localStorage)");
            }
        }
        else {
            this._localStorage = this.core._isClient ? window === null || window === void 0 ? void 0 : window.localStorage : null;
            this.core.InternalLogger.log("LocalStorage: Using no localStorage adapter.");
        }
        this.key = key;
        this.testKey = testKey;
        this.isEncrypted = isEncrypted;
        this.isActive = active;
    }
    LocalStorage.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.core.InternalLogger.log("LocalStorage: Available:", this.isAvailable);
                        if (!this.isActive) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.checkAvailability()];
                    case 1:
                        _a.isAvailable = _b.sent();
                        this.core.InternalLogger.log("LocalStorage: Set to Active");
                        // We will not going to use localStorage if library is loaded in server environment.
                        this.shouldUseLocalStorage =
                            this.isAvailable && this._localStorage && this.core._isClient
                                ? true
                                : false;
                        if (this.shouldUseLocalStorage) {
                            this.core.InternalLogger.log("LocalStorage: Using localStorage.");
                        }
                        else {
                            this.core.InternalLogger.log("LocalStorage: Not using localStorage.");
                        }
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.init()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalStorage.prototype.init = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var localItem;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/];
                        this.core.InternalLogger.log("LocalStorage: Initializing...");
                        return [4 /*yield*/, this.get()];
                    case 1:
                        localItem = _c.sent();
                        if (!localItem) return [3 /*break*/, 2];
                        this.core.InternalLogger.log("LocalStorage: Found local item:", localItem);
                        return [3 /*break*/, 4];
                    case 2:
                        this.core.InternalLogger.log("LocalStorage: No local item found.");
                        return [4 /*yield*/, this.resetLocalValue()];
                    case 3:
                        localItem = _c.sent();
                        _c.label = 4;
                    case 4:
                        (_b = (_a = this.core.Events.on).localStorageInit) === null || _b === void 0 ? void 0 : _b.call(_a, localItem);
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalStorage.prototype.removeItem = function (key) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/];
                        this.core.InternalLogger.log("LocalStorage: Removing...", key);
                        return [4 /*yield*/, ((_a = this._localStorage) === null || _a === void 0 ? void 0 : _a.removeItem(key))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalStorage.prototype.setItem = function (key, value) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/];
                        //this.core.InternalLogger.log("LocalStorage: Setting...", value);
                        return [4 /*yield*/, ((_a = this._localStorage) === null || _a === void 0 ? void 0 : _a.setItem(key, value))];
                    case 1:
                        //this.core.InternalLogger.log("LocalStorage: Setting...", value);
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalStorage.prototype.getItem = function (key) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, ((_a = this._localStorage) === null || _a === void 0 ? void 0 : _a.getItem(key))];
                    case 1: 
                    //this.core.InternalLogger.log("LocalStorage: Getting...", key);
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    LocalStorage.prototype.checkAvailability = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var item, e_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.core._isClient)
                            return [2 /*return*/, false];
                        this.core.InternalLogger.log("LocalStorage: Checking availability...");
                        if (typeof this._localStorage == "undefined") {
                            this.core.InternalLogger.log("LocalStorage: Not available - cant check availability.");
                            return [2 /*return*/, false];
                        }
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 5, , 6]);
                        this.core.InternalLogger.log("LocalStorage: Checking setItem...");
                        return [4 /*yield*/, ((_a = this._localStorage) === null || _a === void 0 ? void 0 : _a.setItem(this.testKey, this.testKey))];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, ((_b = this._localStorage) === null || _b === void 0 ? void 0 : _b.getItem(this.testKey))];
                    case 3:
                        item = _d.sent();
                        this.core.InternalLogger.log("LocalStorage: Checking Item:", item);
                        if (item != this.testKey) {
                            this.core.InternalLogger.log("LocalStorage: Not available - item is not equal to testKey.");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, ((_c = this._localStorage) === null || _c === void 0 ? void 0 : _c.removeItem(this.testKey))];
                    case 4:
                        _d.sent();
                        return [2 /*return*/, true];
                    case 5:
                        e_1 = _d.sent();
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Returns any since item can be anything
    LocalStorage.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localItem, parsed, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/, null];
                        localItem = null;
                        parsed = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (this === null || this === void 0 ? void 0 : this.getItem(this.key))];
                    case 2:
                        localItem = _a.sent();
                        if (!localItem) {
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        return [2 /*return*/, null];
                    case 4:
                        if (this.isEncrypted) {
                            // Decode with Base64.
                            try {
                                localItem = Base64.decode(localItem);
                            }
                            catch (e) {
                                this.clear(); // Clear localStorage so we can start fresh.
                                return [2 /*return*/, null];
                            }
                        }
                        try {
                            parsed = JSON.parse(localItem);
                        }
                        catch (e) {
                            this.clear(); // Clear localStorage so we can start fresh.
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, parsed];
                }
            });
        });
    };
    LocalStorage.prototype.set = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var localItem, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/];
                        localItem = value;
                        try {
                            localItem = JSON.stringify(localItem);
                        }
                        catch (e) {
                            return [2 /*return*/];
                        }
                        if (this.isEncrypted) {
                            // Encode with Base64.
                            try {
                                localItem = Base64.encode(localItem);
                            }
                            catch (e) {
                                return [2 /*return*/];
                            }
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (this === null || this === void 0 ? void 0 : this.setItem(this.key, localItem))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // This function overrides specified values.
    LocalStorage.prototype.setOverride = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var localValue, merged;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.get()];
                    case 1:
                        localValue = _a.sent();
                        merged = Object.assign({}, value, localValue);
                        return [4 /*yield*/, this.set(merged)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalStorage.prototype.clear = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/];
                        this.core.InternalLogger.log("LocalStorage: Clearing everything.");
                        return [4 /*yield*/, ((_a = this === null || this === void 0 ? void 0 : this._localStorage) === null || _a === void 0 ? void 0 : _a.clear())];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalStorage.prototype.clearLogPool = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.get()];
                    case 1:
                        localValue = _a.sent();
                        if (!localValue) {
                            this.core.InternalLogger.log("LocalStorage: Local value is null in clearLogPool.");
                            this.resetLocalValue();
                            return [2 /*return*/];
                        }
                        localValue.logPool = [];
                        this.set(localValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalStorage.prototype.clearRequests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.get()];
                    case 1:
                        localValue = _a.sent();
                        if (!localValue) {
                            this.core.InternalLogger.log("LocalStorage: Local value is null in clearRequests.");
                            this.resetLocalValue();
                            return [2 /*return*/];
                        }
                        localValue.requests = [];
                        this.set(localValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalStorage.prototype.addToLogPool = function (_a) {
        var data = _a.data, options = _a.options, guid = _a.guid, path = _a.path, stack = _a.stack;
        return __awaiter(this, void 0, void 0, function () {
            var localValue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.get()];
                    case 1:
                        localValue = _b.sent();
                        if (!!localValue) return [3 /*break*/, 4];
                        this.core.InternalLogger.log("LocalStorage: Local value is null in addToLogPool.");
                        return [4 /*yield*/, this.resetLocalValue()];
                    case 2:
                        _b.sent();
                        // Resets and pushes first log.
                        localValue = {
                            logPool: [
                                { ts: new Date().getTime(), data: data, options: options, guid: guid, path: path, stack: stack },
                            ],
                            requests: [],
                            lastLogUpdate: new Date().getTime(),
                        };
                        return [4 /*yield*/, this.set(localValue)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                    case 4:
                        localValue.logPool.push({
                            ts: new Date().getTime(),
                            data: data,
                            options: options,
                            guid: guid,
                            path: path,
                            stack: stack,
                        });
                        localValue.lastLogUpdate = new Date().getTime();
                        return [4 /*yield*/, this.set(localValue)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalStorage.prototype.addToRequest = function (_a) {
        var res = _a.res, status = _a.status, ts = _a.ts, guid = _a.guid;
        return __awaiter(this, void 0, void 0, function () {
            var localValue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.get()];
                    case 1:
                        localValue = _b.sent();
                        if (!!localValue) return [3 /*break*/, 4];
                        this.core.InternalLogger.log("LocalStorage: Local value is null in addToRequest.");
                        return [4 /*yield*/, this.resetLocalValue()];
                    case 2:
                        _b.sent();
                        // Resets and pushes first log.
                        localValue = {
                            logPool: [],
                            requests: [{ res: res, status: status, ts: ts, guid: guid }],
                            lastLogUpdate: 0,
                        };
                        return [4 /*yield*/, this.set(localValue)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                    case 4:
                        localValue.requests.push({ res: res, status: status, ts: ts, guid: guid });
                        return [4 /*yield*/, this.set(localValue)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalStorage.prototype.getLocalLogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localValue, logPool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.get()];
                    case 1:
                        localValue = _a.sent();
                        if (!!localValue) return [3 /*break*/, 3];
                        this.core.InternalLogger.log("LocalStorage: Local value is null in getLocalLogs.");
                        return [4 /*yield*/, this.resetLocalValue()];
                    case 2:
                        logPool = (_a.sent()).logPool;
                        return [2 /*return*/, logPool];
                    case 3: return [2 /*return*/, localValue === null || localValue === void 0 ? void 0 : localValue.logPool];
                }
            });
        });
    };
    LocalStorage.prototype.getLocalRequests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localValue, requests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.get()];
                    case 1:
                        localValue = _a.sent();
                        if (!!localValue) return [3 /*break*/, 3];
                        this.core.InternalLogger.log("LocalStorage: Local value is null in getLocalRequests.");
                        return [4 /*yield*/, this.resetLocalValue()];
                    case 2:
                        requests = (_a.sent()).requests;
                        return [2 /*return*/, requests];
                    case 3: return [2 /*return*/, localValue === null || localValue === void 0 ? void 0 : localValue.requests];
                }
            });
        });
    };
    LocalStorage.prototype.getLocalUser = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var localValue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.get()];
                    case 1:
                        localValue = _b.sent();
                        if (!localValue) {
                            this.core.InternalLogger.log("LocalStorage: Local value is null in getLocalUserData.");
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, ((_a = localValue === null || localValue === void 0 ? void 0 : localValue.userData) === null || _a === void 0 ? void 0 : _a.user) || null];
                }
            });
        });
    };
    LocalStorage.prototype.resetLocalValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.core.InternalLogger.log("LocalStorage: Resetting local value in resetLocalValue.");
                        val = {
                            logPool: [],
                            requests: [],
                            lastLogUpdate: 0,
                        };
                        return [4 /*yield*/, this.set(val)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, val];
                }
            });
        });
    };
    LocalStorage.prototype.setAPIValues = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var localValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.get()];
                    case 1:
                        localValue = _a.sent();
                        if (!!localValue) return [3 /*break*/, 3];
                        this.core.InternalLogger.log("LocalStorage: Local value is null in setAPIValue.");
                        this.resetLocalValue();
                        return [4 /*yield*/, this.get()];
                    case 2:
                        localValue = _a.sent();
                        return [2 /*return*/];
                    case 3:
                        localValue.API = value;
                        this.set(localValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalStorage.prototype.getAPIValues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.get()];
                    case 1:
                        localValue = _a.sent();
                        if (!localValue) {
                            this.core.InternalLogger.log("LocalStorage: Local value is null in getAPIValue.");
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, localValue.API || null];
                }
            });
        });
    };
    LocalStorage.prototype.setUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var localValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldUseLocalStorage) {
                            this.core.InternalLogger.log("LocalStorage: Not using localStorage in setUser.");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.get()];
                    case 1:
                        localValue = _a.sent();
                        if (!!localValue) return [3 /*break*/, 4];
                        this.core.InternalLogger.log("LocalStorage: Local value is null in setUser.");
                        return [4 /*yield*/, this.resetLocalValue()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.get()];
                    case 3:
                        localValue = _a.sent();
                        return [2 /*return*/];
                    case 4:
                        if (!localValue.userData) {
                            localValue.userData = {};
                        }
                        localValue.userData.user = user;
                        return [4 /*yield*/, this.set(localValue)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LocalStorage;
}());
export { LocalStorage };
