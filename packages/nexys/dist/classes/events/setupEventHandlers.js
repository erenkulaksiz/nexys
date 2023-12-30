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
import { guid, getPagePath, getSelector } from "../../utils";
export function setupEventHandlers(core, events) {
    events.subscribe("errors.error", function (event) {
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
            stack: extractedError.stack,
            ts: new Date().getTime(),
            options: {
                type: "AUTO:ERROR",
            },
            guid: guid(),
            path: getPagePath(core),
        });
    });
    events.subscribe("errors.unhandled.rejection", function (event) {
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
            stack: extractedRejection.stack,
            ts: new Date().getTime(),
            options: {
                type: "AUTO:UNHANDLEDREJECTION",
            },
            guid: guid(),
            path: getPagePath(core),
        });
    });
    events.subscribe("request.success", function (event) {
        // #TODO: Implement better API responses
        core.InternalLogger.log("Events: Received request success: ", event);
    });
    events.subscribe("request.error", function (event) {
        var messages = {
            "API:FAILED:400:app-name": "NexysCore: Your configured app name and the app name you entered on your project is mismatching. Please check your configuration. Erasing localStorage.",
            "API:FAILED:400:not-verified": "NexysCore: Your project is not verified. Erasing localStorage.",
            "API:FAILED:400:domain": "NexysCore: This domain is not allowed. Enable localhost access on your project if you are testing. Erasing localStorage.",
        };
        var message = messages[event.message];
        if (message) {
            core.InternalLogger.log(message);
            core.LogPool.clearLogs();
            core.LogPool.clearRequests();
            return;
        }
        core.InternalLogger.log("Events: Received request error: ", event);
    });
    events.subscribe("visibility.change", function (event) {
        core.InternalLogger.log("Events: Received visibility.change: ", event);
        core.LogPool.process();
    });
    events.subscribe("click", function (event) {
        var _a, _b, _c, _d, _e, _f;
        var selector = getSelector(event.target);
        core.InternalLogger.log("Events: Received click: ", event, " Clicked:", selector);
        core.LogPool.push({
            data: {
                target: {
                    selector: selector,
                    id: (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.id,
                    class: (_b = event === null || event === void 0 ? void 0 : event.target) === null || _b === void 0 ? void 0 : _b.className,
                    tag: (_c = event === null || event === void 0 ? void 0 : event.target) === null || _c === void 0 ? void 0 : _c.tagName,
                    type: (_d = event === null || event === void 0 ? void 0 : event.target) === null || _d === void 0 ? void 0 : _d.type,
                    innerText: ((_e = event === null || event === void 0 ? void 0 : event.target) === null || _e === void 0 ? void 0 : _e.innerText)
                        ? (_f = event === null || event === void 0 ? void 0 : event.target) === null || _f === void 0 ? void 0 : _f.innerText.substring(0, 32)
                        : "",
                },
                screenX: event === null || event === void 0 ? void 0 : event.screenX,
                screenY: event === null || event === void 0 ? void 0 : event.screenY,
                pointerId: event === null || event === void 0 ? void 0 : event.pointerId,
                pointerType: event === null || event === void 0 ? void 0 : event.pointerType,
            },
            ts: new Date().getTime(),
            options: {
                type: "AUTO:CLICK",
            },
            guid: guid(),
            path: getPagePath(core),
        });
    });
}
