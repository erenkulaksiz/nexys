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
    return Events;
}());
export { Events };
