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
import checkVersion from "../core/checkVersion.js";
export default function loadFromLocalStorage(core) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var localLogs, localRequests, localUser, localPlatform, localVersion, APIValues;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!((_a = core._options.localStorage) === null || _a === void 0 ? void 0 : _a.useLocalStorage))
                        return [2 /*return*/];
                    return [4 /*yield*/, core.LocalStorage.getLocalLogs()];
                case 1:
                    localLogs = _b.sent();
                    if (Array.isArray(localLogs) && localLogs.length > 0) {
                        core.LogPool.setLogs(localLogs);
                        core.InternalLogger.log("NexysCore: Set logs from localStorage.", localLogs);
                    }
                    else if (Array.isArray(localLogs) && localLogs.length == 0) {
                        core.InternalLogger.log("NexysCore: LocalStorage is empty, no logs found.");
                    }
                    return [4 /*yield*/, core.LocalStorage.getLocalRequests()];
                case 2:
                    localRequests = _b.sent();
                    if (Array.isArray(localRequests) && localRequests.length > 0) {
                        core.LogPool.setRequests(localRequests);
                        core.InternalLogger.log("NexysCore: Set requests from localStorage.", localRequests);
                    }
                    else if (Array.isArray(localRequests) && localRequests.length == 0) {
                        core.InternalLogger.log("NexysCore: LocalStorage is empty, no requests found.");
                    }
                    return [4 /*yield*/, core.LocalStorage.getConfigValue("user")];
                case 3:
                    localUser = _b.sent();
                    return [4 /*yield*/, core.LocalStorage.getConfigValue("platform")];
                case 4:
                    localPlatform = _b.sent();
                    return [4 /*yield*/, core.LocalStorage.getConfigValue("appVersion")];
                case 5:
                    localVersion = _b.sent();
                    if (localUser) {
                        core._config = __assign(__assign({}, core._config), { user: localUser });
                        core.InternalLogger.log("NexysCore: Set user from localStorage.", localUser);
                    }
                    else {
                        core.InternalLogger.log("NexysCore: LocalStorage is empty, no user found.");
                    }
                    if (localPlatform) {
                        core._config = __assign(__assign({}, core._config), { platform: localPlatform });
                        core.InternalLogger.log("NexysCore: Set platform from localStorage.", localPlatform);
                    }
                    else {
                        core.InternalLogger.log("NexysCore: LocalStorage is empty, no platform found.");
                    }
                    if (localVersion) {
                        core._config = __assign(__assign({}, core._config), { appVersion: localVersion });
                        core.InternalLogger.log("NexysCore: Set version from localStorage.", localVersion);
                    }
                    else {
                        core.InternalLogger.log("NexysCore: LocalStorage is empty, no version found.");
                    }
                    return [4 /*yield*/, core.LocalStorage.getAPIValues()];
                case 6:
                    APIValues = _b.sent();
                    if (APIValues) {
                        core._APIValues = APIValues;
                        core.InternalLogger.log("NexysCore: Set API values from localStorage.", APIValues);
                        checkVersion(core);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
