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

import type { logTypes, requestTypes } from "../../types";

export interface EventTypes {
  "errors.error"?: ((event: ErrorEvent) => void) | null;
  "errors.unhandled.rejection"?:
    | ((event: PromiseRejectionEvent) => void)
    | null;
  "log.add"?: ((log: logTypes) => void) | null;
  "logs.clear"?: (() => void) | null;
  "requests.clear"?: (() => void) | null;
  "core.init"?: (() => void) | null;
  "logpool.process"?: (() => void) | null;
  "logpool.init"?: (() => void) | null;
  "request.sending"?: ((data?: any) => void) | null; // data: any
  "request.success"?:
    | (({ res, json }: { res?: Response; json: any }) => void)
    | null;
  "request.error"?: ((error: Error) => void) | null;
  "request.add"?: (({ res, status, ts }: requestTypes) => void) | null;
  "localstorage.init"?: ((localItem: any) => void) | null;
  "internallogger.init"?: (() => void) | null;
  "device.init"?: (() => void) | null;
  "events.bind.success"?: (() => void) | null;
  "events.bind.failed"?: (() => void) | null;
  "config.user"?: ((user?: string) => void) | null;
  "config.app.version"?: ((version?: string) => void) | null;
  "config.platform"?: ((platform?: string) => void) | null;
  "visibility.change"?: ((event: Event) => void) | null;
  beforeunload?: ((event: Event) => void) | null;
  click?: ((event: Event) => void) | null;
}
