import type { initParams, logReturnType, logTypes } from "./types";
/**
 * Nexys Client
 *
 * @remarks This package coordinates the communication between the Nexys client library and dashboard server
 * @packageDocumentation
 */
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
declare class Nexys {
    private _apiKey;
    private _options;
    private _server;
    private _version;
    private _logPool;
    constructor(API_KEY: initParams["api_key"], options: initParams["options"]);
    /**
     * Adds log request to logPool in Nexys instance.
     *
     * @example
     * ```javascript
     * // Initialize the client and log "Hello World"
     * const nexys = new Nexys("API_KEY");
     * nexys.log("Hello World");
     * ```
     *
     * @param data - Any data to be logged.
     * @param options - Log options.
     *
     * @returns {Promise<logReturnType>} - Returns a promise that resolves to "SUCCESS" or "ERROR".
     *
     * @public
     */
    log(data: logTypes["data"], options?: logTypes["options"]): Promise<logReturnType>;
    private _internalLog;
    private pushLog;
    private processLogPool;
    private checkInternalData;
}
export default Nexys;
//# sourceMappingURL=index.d.ts.map