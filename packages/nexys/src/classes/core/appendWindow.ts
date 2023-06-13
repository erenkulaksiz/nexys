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

import { isClient } from "../../utils/isClient.js";
import { Core } from "./index.js";

export default function appendWindow(core: Core) {
  core.InternalLogger.log("NexysCore: appendWindow called");
  if (isClient()) {
    if (!window["nexys"] && !window?.nexys) {
      window["nexys"] = core;
      core.InternalLogger.log("NexysCore: appendWindow appended core.");
    } else {
      core.InternalLogger.log("NexysCore: appendWindow core already appended.");
    }
  } else {
    core.InternalLogger.log("NexysCore: appendWindow not in client.");
  }
}
