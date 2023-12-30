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
import { bindEvents } from "./bindEvents.js";
import { setupEventHandlers } from "./setupEventHandlers.js";
var Events = /** @class */ (function () {
    function Events(core) {
        var _a, _b, _c;
        this.on = {};
        this.core = core;
        if ((_c = (_b = (_a = this.core) === null || _a === void 0 ? void 0 : _a._options) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c.allowAutomaticHandling) {
            setupEventHandlers(this.core, this);
            bindEvents(this.core, this);
        }
    }
    Events.prototype.fire = function (event, data) {
        var _this = this;
        // #TODO: Fix ts-ignore
        // @ts-ignore
        if (this.on[event] == null || this.on[event] == undefined) {
            this.core.InternalLogger.log("Events: Event ".concat(event, " is not subscribed."));
            return;
        }
        this.core.InternalLogger.log("Events: Firing event ".concat(event));
        // @ts-ignore
        this.on[event].forEach(function (callback) {
            if (typeof callback !== "function") {
                _this.core.InternalLogger.log("Events: Callback is not a function.", callback);
                return;
            }
            callback(data);
        });
    };
    Events.prototype.subscribe = function (event, callback) {
        // @ts-ignore
        if (this.on[event] == null || this.on[event] == undefined) {
            // @ts-ignore
            this.on[event] = [];
        }
        // @ts-ignore
        this.on[event].push(callback);
    };
    Events.prototype.unsubscribe = function (event) {
        // @ts-ignore
        this.on[event] = null;
    };
    return Events;
}());
export { Events };
