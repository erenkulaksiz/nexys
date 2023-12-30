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

import type { Core } from "../core/index.js";
import type { Events } from "./index.js";

export function bindEvents(core: Core, events: Events) {
  if (core._isClient) {
    core.InternalLogger.log("Events: Binding error events.");
    try {
      window.addEventListener("error", (event: ErrorEvent) => {
        event.stopImmediatePropagation();
        if (event.error.hasBeenCaught !== undefined) {
          return false;
        }
        event.error.hasBeenCaught = true;
        events.fire("errors.error", event);
        return true;
      });
      window.addEventListener(
        "unhandledrejection",
        (event: PromiseRejectionEvent) => {
          event.stopImmediatePropagation();
          events.fire("errors.unhandled.rejection", event);
          return true;
        }
      );
      window.addEventListener("visibilitychange", (event) => {
        core.InternalLogger.log(
          "Events: Received visibilitychange event",
          event
        );
        if (document.visibilityState === "hidden") {
          events.fire("visibility.change", event);
        }
      });
      window.addEventListener("beforeunload", (event) => {
        core.InternalLogger.log("Events: Received beforeunload event", event);
        events.fire("beforeunload", event);
      });
      if (core._clickTrack) {
        core.InternalLogger.log("Events: Binding click event.");
        window.addEventListener("click", (event) => {
          core.InternalLogger.log(
            "Events: Received click event",
            core._clickTrack
          );
          events.fire("click", event);
        });
      }
      core.InternalLogger.log("Events: Binded error events.");
      events.fire("events.bind.success");
    } catch (err) {
      core.InternalLogger.log("Events: Couldnt bind error event.", err);
      events.fire("events.bind.failed");
    }
    return;
  }
  core.InternalLogger.log("Events: Couldnt bind error event. Not client.");
}
