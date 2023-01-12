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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * @class InternalLogger
 * @description This class is used to log internal errors or debug related logs to the console.
 */
var InternalLogger = /** @class */ (function () {
    function InternalLogger(core, _a) {
        var active = _a.active;
        this._active = false;
        this.isAvailable = false;
        this.core = core;
        this._active = active;
        this.isAvailable = this.checkAvailability();
        if (this.isAvailable && this._active)
            this.log("InternalLogger: Active");
    }
    InternalLogger.prototype.checkAvailability = function () {
        try {
            if (typeof console !== "undefined" && typeof console.log === "function") {
                return true;
            }
        }
        catch (e) {
            return false;
        }
        return false;
    };
    InternalLogger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this._active || !this.isAvailable)
            return;
        console.log.apply(console, __spreadArray(["[NEXYS-DEBUG]: "], args, false));
    };
    return InternalLogger;
}());
export { InternalLogger };
