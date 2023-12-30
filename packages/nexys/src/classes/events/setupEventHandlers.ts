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

import { guid, getPagePath, getSelector } from "../../utils/index.js";
import type { Events } from "./index.js";
import type { Core } from "../core/index.js";

export function setupEventHandlers(core: Core, events: Events) {
  events.subscribe("errors.error", (event: ErrorEvent) => {
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
      stack: extractedError.stack,
      ts: new Date().getTime(),
      options: {
        type: "AUTO:ERROR",
      },
      guid: guid(),
      path: getPagePath(core),
    });
  });

  events.subscribe(
    "errors.unhandled.rejection",
    (event: PromiseRejectionEvent) => {
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
        stack: extractedRejection.stack,
        ts: new Date().getTime(),
        options: {
          type: "AUTO:UNHANDLEDREJECTION",
        },
        guid: guid(),
        path: getPagePath(core),
      });
    }
  );

  events.subscribe("request.success", (event: { res: Response; json: any }) => {
    // #TODO: Implement better API responses
    core.InternalLogger.log("Events: Received request success: ", event);
  });

  events.subscribe("request.error", (event: Error) => {
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
      core.LogPool.clearLogs();
      core.LogPool.clearRequests();
      return;
    }
    core.InternalLogger.log("Events: Received request error: ", event);
  });

  events.subscribe("visibility.change", (event) => {
    core.InternalLogger.log("Events: Received visibility.change: ", event);
    core.LogPool.process();
  });

  events.subscribe("click", (event) => {
    if (!event.target) {
      core.InternalLogger.error(
        "Events: Got click event without target",
        event
      );
      return;
    }

    const selector = getSelector(event.target);
    const pos = event.target.getBoundingClientRect();
    core.InternalLogger.log(
      "Events: Received click: ",
      event,
      " Clicked:",
      selector
    );

    core.LogPool.push({
      data: {
        target: {
          selector: selector,
          id: event?.target?.id,
          class: event?.target?.className,
          tag: event?.target?.tagName,
          type: event?.target?.type,
          innerText: event?.target?.innerText
            ? event?.target?.innerText.substring(0, 32)
            : "",
        },
        screenX: event?.screenX,
        screenY: event?.screenY,
        pointerId: event?.pointerId,
        pointerType: event?.pointerType,
        pos,
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
