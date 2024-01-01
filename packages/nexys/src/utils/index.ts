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

export const server = "https://api.nexys.app";
export const debugServer = "http://localhost:8000";
export const libraryName = "Nexys";
export const version = "1.1.8";
export { Base64 } from "./base64.js";
export { isClient } from "./isClient.js";
export { guid } from "./guid.js";
export {
  collectNextJSData,
  collectVercelEnv,
  collectDOMData,
} from "./collect.js";
export { getSelector } from "./getSelector.js";
export { getPagePath } from "./getPagePath.js";
export const defaultOptions = {
  localStorage: {
    useLocalStorage: true,
    useAdapter: false,
    cryption: true,
    key: "__nex__",
    testKey: "__nex-t__",
  },
  errors: {
    allowAutomaticHandling: true,
  },
};
