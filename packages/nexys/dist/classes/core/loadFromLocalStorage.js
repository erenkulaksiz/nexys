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
import checkVersion from "../core/checkVersion.js";
export default function loadFromLocalStorage(core) {
    var _a, _b, _c, _d, _e;
    // Load logs from localStorage
    var localLogs = core.LocalStorage.getLocalLogs();
    if (Array.isArray(localLogs) &&
        localLogs.length > 0 &&
        ((_a = core._options.localStorage) === null || _a === void 0 ? void 0 : _a.useLocalStorage)) {
        core.LogPool.setLogs(localLogs);
        core.InternalLogger.log("NexysCore: Set logs from localStorage.", localLogs);
    }
    else if (Array.isArray(localLogs) &&
        localLogs.length == 0 &&
        ((_b = core._options.localStorage) === null || _b === void 0 ? void 0 : _b.useLocalStorage)) {
        core.InternalLogger.log("NexysCore: LocalStorage is empty, no logs found.");
    }
    // Load requests from localStorage
    var localRequests = core.LocalStorage.getLocalRequests();
    if (Array.isArray(localRequests) &&
        localRequests.length > 0 &&
        ((_c = core._options.localStorage) === null || _c === void 0 ? void 0 : _c.useLocalStorage)) {
        core.LogPool.setRequests(localRequests);
        core.InternalLogger.log("NexysCore: Set requests from localStorage.", localRequests);
    }
    else if (Array.isArray(localRequests) &&
        localRequests.length == 0 &&
        ((_d = core._options.localStorage) === null || _d === void 0 ? void 0 : _d.useLocalStorage)) {
        core.InternalLogger.log("NexysCore: LocalStorage is empty, no requests found.");
    }
    var localUser = core.LocalStorage.getLocalUser();
    if ((_e = core._options.localStorage) === null || _e === void 0 ? void 0 : _e.useLocalStorage) {
        if (localUser) {
            core._config = __assign(__assign({}, core._config), { user: localUser });
            core.InternalLogger.log("NexysCore: Set user from localStorage.", localUser);
        }
        else {
            core.InternalLogger.log("NexysCore: LocalStorage is empty, no user found.");
        }
    }
    var APIValues = core.LocalStorage.getAPIValues();
    if (APIValues) {
        core._APIValues = APIValues;
        core.InternalLogger.log("NexysCore: Set API values from localStorage.", APIValues);
        checkVersion(core);
    }
}
