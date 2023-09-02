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

import { Core } from "../core/index.js";
import { guid } from "../../utils/guid.js";
import getPagePath from "../../utils/getPagePath.js";
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
      this.setupEventHandlers();
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
        window.addEventListener("unload", (event: BeforeUnloadEvent) => {
          this.core.InternalLogger.log("Events: Received unload event", event);
        });
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

  private setupEventHandlers() {
    this.on.error = (event: ErrorEvent) => {
      this.core.InternalLogger.log("Events: Received error", event);

      const extractedError = {
        message: event?.message,
        errmessage: event?.error?.message,
        stack: event?.error?.stack,
        type: event?.type,
        colno: event?.colno,
        lineno: event?.lineno,
        filename: event?.filename,
        defaultPrevented: event?.defaultPrevented,
        isTrusted: event?.isTrusted,
        timeStamp: event?.timeStamp,
      };

      this.core.LogPool.push({
        data: {
          ...extractedError,
        },
        ts: new Date().getTime(),
        options: {
          type: "AUTO:ERROR",
        },
        guid: guid(),
        path: getPagePath(this.core),
      });
    };

    this.on.unhandledRejection = (event: PromiseRejectionEvent) => {
      this.core.InternalLogger.log(
        "Events: Received unhandledRejection: ",
        event
      );

      const extractedRejection = {
        message: event?.reason?.message,
        stack: event?.reason?.stack,
        type: event?.type,
        isTrusted: event?.isTrusted,
        defaultPrevented: event?.defaultPrevented,
        timeStamp: event?.timeStamp,
      };

      this.core.LogPool.push({
        data: {
          ...extractedRejection,
        },
        ts: new Date().getTime(),
        options: {
          type: "AUTO:UNHANDLEDREJECTION",
        },
        guid: guid(),
        path: getPagePath(this.core),
      });
    };

    this.on.request.success = (event) => {
      this.core.InternalLogger.log("Events: Received request success: ", event);
    };

    this.on.request.error = (event) => {
      const messages: {
        [key: string]: string;
      } = {
        "API:FAILED:400:app-name": `NexysCore: Your configured app name and the app name you entered on your project is mismatching. Please check your configuration. Erasing localStorage.`,
        "API:FAILED:400:not-verified": `NexysCore: Your project is not verified. Erasing localStorage.`,
        "API:FAILED:400:domain": `NexysCore: This domain is not allowed. Enable localhost access on your project if you are testing. Erasing localStorage.`,
      };
      const message = messages[event.message];
      if (message) {
        this.core.InternalLogger.log(message);
        this.core.LocalStorage.clear();
        this.core.LogPool.clearLogs();
        this.core.LogPool.clearRequests();
        return;
      }
      this.core.InternalLogger.log("Events: Received request error: ", event);
    };
  }
}
