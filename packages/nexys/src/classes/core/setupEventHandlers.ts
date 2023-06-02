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

import { Core } from ".";
import { guid } from "../../utils/guid.js";
import getPagePath from "../../utils/getPagePath.js";

export default function setupEventHandlers(core: Core) {
  core.Events.on.error = (event: ErrorEvent) => {
    core.InternalLogger.log("Events: Received error", event);

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

    core.LogPool.push({
      data: {
        ...extractedError,
      },
      ts: new Date().getTime(),
      options: {
        type: "AUTO:ERROR",
      },
      guid: guid(),
      path: getPagePath(core),
    });
  };

  core.Events.on.unhandledRejection = (event: PromiseRejectionEvent) => {
    core.InternalLogger.log("Events: Received unhandledRejection: ", event);

    const extractedRejection = {
      message: event?.reason?.message,
      stack: event?.reason?.stack,
      type: event?.type,
      isTrusted: event?.isTrusted,
      defaultPrevented: event?.defaultPrevented,
      timeStamp: event?.timeStamp,
    };

    core.LogPool.push({
      data: {
        ...extractedRejection,
      },
      ts: new Date().getTime(),
      options: {
        type: "AUTO:UNHANDLEDREJECTION",
      },
      guid: guid(),
      path: getPagePath(core),
    });
  };

  core.Events.on.request.success = (event) => {
    core.InternalLogger.log("Events: Received request success: ", event);
  };
  core.Events.on.request.error = (event) => {
    const messages: {
      [key: string]: string;
    } = {
      "API:FAILED:400:app-name": `NexysCore: Your configured app name and the app name you entered on your project is mismatching. Please check your configuration. Erasing localStorage.`,
      "API:FAILED:400:not-verified": `NexysCore: Your project is not verified. Erasing localStorage.`,
      "API:FAILED:400:domain": `NexysCore: This domain is not allowed. Enable localhost access on your project if you are testing. Erasing localStorage.`,
    };
    const message = messages[event.message];
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
