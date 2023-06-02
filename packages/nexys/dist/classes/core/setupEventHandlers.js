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
import { guid } from "../../utils/guid.js";
import getPagePath from "../../utils/getPagePath.js";
export default function setupEventHandlers(core) {
    core.Events.on.error = function (event) {
        var _a, _b;
        core.InternalLogger.log("Events: Received error", event);
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
        core.LogPool.push({
            data: __assign({}, extractedError),
            ts: new Date().getTime(),
            options: {
                type: "AUTO:ERROR",
            },
            guid: guid(),
            path: getPagePath(core),
        });
    };
    core.Events.on.unhandledRejection = function (event) {
        var _a, _b;
        core.InternalLogger.log("Events: Received unhandledRejection: ", event);
        var extractedRejection = {
            message: (_a = event === null || event === void 0 ? void 0 : event.reason) === null || _a === void 0 ? void 0 : _a.message,
            stack: (_b = event === null || event === void 0 ? void 0 : event.reason) === null || _b === void 0 ? void 0 : _b.stack,
            type: event === null || event === void 0 ? void 0 : event.type,
            isTrusted: event === null || event === void 0 ? void 0 : event.isTrusted,
            defaultPrevented: event === null || event === void 0 ? void 0 : event.defaultPrevented,
            timeStamp: event === null || event === void 0 ? void 0 : event.timeStamp,
        };
        core.LogPool.push({
            data: __assign({}, extractedRejection),
            ts: new Date().getTime(),
            options: {
                type: "AUTO:UNHANDLEDREJECTION",
            },
            guid: guid(),
            path: getPagePath(core),
        });
    };
    core.Events.on.request.success = function (event) {
        core.InternalLogger.log("Events: Received request success: ", event);
    };
    core.Events.on.request.error = function (event) {
        var messages = {
            "API:FAILED:400:app-name": "NexysCore: Your configured app name and the app name you entered on your project is mismatching. Please check your configuration. Erasing localStorage.",
            "API:FAILED:400:not-verified": "NexysCore: Your project is not verified. Erasing localStorage.",
            "API:FAILED:400:domain": "NexysCore: This domain is not allowed. Enable localhost access on your project if you are testing. Erasing localStorage.",
        };
        var message = messages[event.message];
        if (message) {
            core.InternalLogger.log(message);
            core.LocalStorage.clear();
            core.LogPool.clearLogs();
            core.LogPool.clearRequests();
            return;
        }
        core.InternalLogger.log("Events: Received request error: ", event);
    };
}
