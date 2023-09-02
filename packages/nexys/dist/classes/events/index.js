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
var Events = /** @class */ (function () {
    function Events(core) {
        var _a, _b, _c;
        this._bindedErrorEvent = false;
        this.on = {
            error: null,
            unhandledRejection: null,
            logAdd: null,
            logsClear: null,
            requestsClear: null,
            coreInit: null,
            process: null,
            request: {
                sending: null,
                success: null,
                error: null,
            },
            requestAdd: null,
            localStorageInit: null,
        };
        this.core = core;
        if ((_c = (_b = (_a = this.core) === null || _a === void 0 ? void 0 : _a._options) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c.allowAutomaticHandling) {
            this.setupEventHandlers();
            this.bindErrorEvents();
        }
    }
    Events.prototype.bindErrorEvents = function () {
        var _this = this;
        if (this._bindedErrorEvent) {
            this.core.InternalLogger.log("Events: Couldnt bind error event. Already binded.");
            return;
        }
        if (this.core._isClient) {
            this.core.InternalLogger.log("Events: Binding error events.");
            try {
                window.addEventListener("error", function (event) {
                    event.stopImmediatePropagation();
                    if (event.error.hasBeenCaught !== undefined) {
                        return false;
                    }
                    event.error.hasBeenCaught = true;
                    typeof _this.on.error == "function" && _this.on.error(event);
                    return true;
                });
                window.addEventListener("unhandledrejection", function (event) {
                    event.stopImmediatePropagation();
                    typeof _this.on.unhandledRejection == "function" &&
                        _this.on.unhandledRejection(event);
                    return true;
                });
                window.addEventListener("unload", function (event) {
                    _this.core.InternalLogger.log("Events: Received unload event", event);
                });
                this._bindedErrorEvent = true;
                this.core.InternalLogger.log("Events: Binded error events.");
            }
            catch (err) {
                this.core.InternalLogger.log("Events: Couuldnt bind error event.", err);
            }
            return;
        }
        this.core.InternalLogger.log("Events: Couldnt bind error event. Not client.");
    };
    Events.prototype.setupEventHandlers = function () {
        var _this = this;
        this.on.error = function (event) {
            var _a, _b;
            _this.core.InternalLogger.log("Events: Received error", event);
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
            _this.core.LogPool.push({
                data: __assign({}, extractedError),
                ts: new Date().getTime(),
                options: {
                    type: "AUTO:ERROR",
                },
                guid: guid(),
                path: getPagePath(_this.core),
            });
        };
        this.on.unhandledRejection = function (event) {
            var _a, _b;
            _this.core.InternalLogger.log("Events: Received unhandledRejection: ", event);
            var extractedRejection = {
                message: (_a = event === null || event === void 0 ? void 0 : event.reason) === null || _a === void 0 ? void 0 : _a.message,
                stack: (_b = event === null || event === void 0 ? void 0 : event.reason) === null || _b === void 0 ? void 0 : _b.stack,
                type: event === null || event === void 0 ? void 0 : event.type,
                isTrusted: event === null || event === void 0 ? void 0 : event.isTrusted,
                defaultPrevented: event === null || event === void 0 ? void 0 : event.defaultPrevented,
                timeStamp: event === null || event === void 0 ? void 0 : event.timeStamp,
            };
            _this.core.LogPool.push({
                data: __assign({}, extractedRejection),
                ts: new Date().getTime(),
                options: {
                    type: "AUTO:UNHANDLEDREJECTION",
                },
                guid: guid(),
                path: getPagePath(_this.core),
            });
        };
        this.on.request.success = function (event) {
            _this.core.InternalLogger.log("Events: Received request success: ", event);
        };
        this.on.request.error = function (event) {
            var messages = {
                "API:FAILED:400:app-name": "NexysCore: Your configured app name and the app name you entered on your project is mismatching. Please check your configuration. Erasing localStorage.",
                "API:FAILED:400:not-verified": "NexysCore: Your project is not verified. Erasing localStorage.",
                "API:FAILED:400:domain": "NexysCore: This domain is not allowed. Enable localhost access on your project if you are testing. Erasing localStorage.",
            };
            var message = messages[event.message];
            if (message) {
                _this.core.InternalLogger.log(message);
                _this.core.LocalStorage.clear();
                _this.core.LogPool.clearLogs();
                _this.core.LogPool.clearRequests();
                return;
            }
            _this.core.InternalLogger.log("Events: Received request error: ", event);
        };
    };
    return Events;
}());
export { Events };
