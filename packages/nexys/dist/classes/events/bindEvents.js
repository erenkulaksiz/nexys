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
export function bindEvents(core, events) {
    var _a, _b;
    if (core._isClient) {
        core.InternalLogger.log("Events: Binding error events.");
        try {
            if ((_b = (_a = core === null || core === void 0 ? void 0 : core._options) === null || _a === void 0 ? void 0 : _a.errors) === null || _b === void 0 ? void 0 : _b.allowAutomaticHandling) {
                window.addEventListener("error", function (event) {
                    event.stopImmediatePropagation();
                    if (event.error.hasBeenCaught !== undefined) {
                        return false;
                    }
                    event.error.hasBeenCaught = true;
                    events.fire("errors.error", event);
                    return true;
                });
                window.addEventListener("unhandledrejection", function (event) {
                    event.stopImmediatePropagation();
                    events.fire("errors.unhandled.rejection", event);
                    return true;
                });
            }
            window.addEventListener("visibilitychange", function (event) {
                core.InternalLogger.log("Events: Received visibilitychange event", event);
                if (document.visibilityState === "hidden") {
                    events.fire("visibility.change", event);
                }
            });
            window.addEventListener("beforeunload", function (event) {
                core.InternalLogger.log("Events: Received beforeunload event", event);
                events.fire("beforeunload", event);
            });
            if (core._clickTrack) {
                core.InternalLogger.log("Events: Binding click event.");
                window.addEventListener("click", function (event) {
                    core.InternalLogger.log("Events: Received click event", core._clickTrack);
                    events.fire("click", event);
                });
            }
            core.InternalLogger.log("Events: Binded events.");
            events.fire("events.bind.success");
        }
        catch (err) {
            core.InternalLogger.log("Events: Couldnt bind events.", err);
            events.fire("events.bind.failed");
        }
        return;
    }
    core.InternalLogger.log("Events: Couldnt bind events. Not client.");
}
