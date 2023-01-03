import type { initOptions, logOptions, logReturnType } from "./types";
/**
 * Nexys Client
 *
 * @remarks This package coordinates the communication between the Nexys client library and dashboard server.
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
    _server: string;
    _version: string;
    private _apiKey;
    private _options;
    private _logPool;
    private _hardUpdate;
    private _softUpdate;
    /**
     * Creates a Nexys instance that can be used anywhere in your application.
     *
     *  * @example
     * ```javascript
     * // Initialize the client
     * const nexys = new Nexys("API_KEY");
     * ```
     *
     * @param API_KEY - The Public API key you retrieve from our dashboard
     * @param options - Object containing all options below
     * @param options.debug - Enables debug mode for internal logs - also uses debug server
     * @param options.logPoolSize - Sets the logPool max log size to send when logPool size exceedes this limit
     * @param options.sendAllOnType - Ignores logPoolSize when any log with specified type is recieved, then sends all logs
     * @param options.server - Change logging server
     */
    constructor(API_KEY: string, options?: initOptions);
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
     * @param data - Any data to be logged
     * @param options - Log options specified below
     * @param options.type - Log type
     * @param options.level - Log level
     * @param options.tags - Log tags
     *
     * @returns - Returns a promise that resolves to "SUCCESS" or "ERROR"
     *
     * @public
     */
    log(data: any, options?: logOptions): Promise<logReturnType>;
    /**
     * Logs all details about Nexys instance. Just dont use it.
     */
    __DO_NOT_USE_THIS(): void;
    setOptions(options: initOptions): void;
    private _internalLog;
    private pushLog;
    private processLogPool;
    private sendRequest;
}
export default Nexys;
//# sourceMappingURL=index.d.ts.map