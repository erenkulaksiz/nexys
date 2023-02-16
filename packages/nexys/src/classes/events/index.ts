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

import { isClient } from "../../utils/index.js";
import { Core } from "../core/index.js";
import type { EventTypes } from "./types";

export class Events {
  private core: Core;
  private _bindedErrorEvent: boolean = false;

  public on: EventTypes = {
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

  constructor(core: Core) {
    this.core = core;

    if (this.core?._options?.errors?.allowAutomaticHandling) {
      this.bindErrorEvents();
    }
  }

  private bindErrorEvents(): void {
    if (this._bindedErrorEvent) {
      this.core.InternalLogger.log(
        "Events: Couldnt bind error event. Already binded."
      );
      return;
    }
    if (this.core._isClient) {
      this.core.InternalLogger.log("Events: Binding error events.");
      try {
        window.addEventListener("error", (event: ErrorEvent) => {
          event.stopImmediatePropagation();
          if (event.error.hasBeenCaught !== undefined) {
            return false;
          }
          event.error.hasBeenCaught = true;
          typeof this.on.error == "function" && this.on.error(event);
          return true;
        });
        window.addEventListener(
          "unhandledrejection",
          (event: PromiseRejectionEvent) => {
            event.stopImmediatePropagation();
            typeof this.on.unhandledRejection == "function" &&
              this.on.unhandledRejection(event);
            return true;
          }
        );
        this._bindedErrorEvent = true;
        this.core.InternalLogger.log("Events: Binded error events.");
      } catch (err) {
        this.core.InternalLogger.log("Events: Couuldnt bind error event.", err);
      }
      return;
    }
    this.core.InternalLogger.log(
      "Events: Couldnt bind error event. Not client."
    );
  }
}
