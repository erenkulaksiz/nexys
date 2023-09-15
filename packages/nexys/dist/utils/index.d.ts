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
export declare const server = "https://dash.nexys.app";
export declare const debugServer = "http://localhost:3000";
export declare const libraryName = "Nexys";
export declare const version = "1.1.3";
export { Base64 } from "./base64.js";
export { isClient } from "./isClient.js";
export { guid } from "./guid.js";
export { collectNextJSData, collectVercelEnv, collectDOMData, } from "./collect.js";
export declare const defaultOptions: {
    localStorage: {
        useLocalStorage: boolean;
        useAdapter: boolean;
        cryption: boolean;
        key: string;
        testKey: string;
    };
    errors: {
        allowAutomaticHandling: boolean;
    };
};
//# sourceMappingURL=index.d.ts.map