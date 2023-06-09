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
  error: ((event: ErrorEvent) => void) | null;
  unhandledRejection: ((event: PromiseRejectionEvent) => void) | null;
  logAdd: ((log: logTypes) => void) | null;
  logsClear: (() => void) | null;
  requestsClear: (() => void) | null;
  coreInit: (() => void) | null;
  process: (() => void) | null;
  request: {
    sending: ((data?: any) => void) | null; // data: any
    success: (({ res, json }: { res?: Response; json: any }) => void) | null;
    error: ((error: Error) => void) | null;
  };
  localStorageInit: ((localItem: any) => void) | null;
  requestAdd: (({ res, status, ts }: requestTypes) => void) | null;
}
