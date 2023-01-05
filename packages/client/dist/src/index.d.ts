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
    private _appName;
    private _isLocalStorageAvailable;
    private _useBase64;
    private _localStorageKey;
    private _localStorageTestKey;
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
     * const nexys = new Nexys("API_KEY", { appName: "My_app" });
     * ```
     *
     * @param API_KEY - `Required` - The Public API key you retrieve from our dashboard
     * @param options - `Required` - Object containing all options below
     * @param options.appName - `Required` - Name of your application
     * @param options.debug - `Optional` - Enables debug mode for internal logs - also uses debug server - Default is `false`
     * @param options.logPoolSize - `Optional` - Sets the logPool max log size to send when logPool size exceedes this limit - Default is `5`
     * @param options.sendAllLogsOnType - `Optional` - Ignores logPoolSize when any log with specified type is recieved, then sends all logs in logPool - Default is `null`
     * @param options.server - `Optional` - Change logging server - Default is `https://api.nexys.dev`
     * @param options.storeInLocalStorage - `Optional` - Store logPool in localStorage - Default is `true`
     * @param options.useLocalStorageKey - `Optional` - Use a different localStorage key for logPool - Default is `__nexysLogPool__`
     * @param options.useLocalStorageTestKey - `Optional` - Use a different localStorage key for testing localStorage availability - Default is `__nexysTest__`
     * @param options.useCryptionOnLocalStorage - `Optional` - Use encryption on localStorage - Default is `true`
     */
    constructor(API_KEY: string, options?: initOptions);
    /**
     * Adds log request to logPool in Nexys instance.
     *
     * @example
     * ```javascript
     * // Initialize the client and log "Hello World"
     * const nexys = new Nexys("API_KEY", { appName: "My_app" });
     * nexys.log("Hello World");
     * ```
     *
     * ```javascript
     * // Initialize the client and log "Hello World" with options
     * nexys.log("Hello World", { type: "info" });
     * ```
     *
     * @param data - Any data to be logged
     * @param options - `Optional` - Log options specified below
     * @param options.type - `Optional` - Log type
     * @param options.level - `Optional` - Log level
     * @param options.tags - `Optional` - Log tags
     *
     * @returns - Returns a promise
     *
     * @public
     */
    log(data: any, options?: logOptions): Promise<logReturnType>;
    /**
     * Logs all details about Nexys instance. Just dont use it.
     * @public
     */
    __DO_NOT_USE_THIS(): void;
    /**
     * Sets internal options for Nexys instance.
     *
     * @param options - Object containing all options below
     * @param options.debug - Enables debug mode for internal logs - also uses debug server
     * @param options.logPoolSize - Sets the logPool max log size to send when logPool size exceedes this limit
     * @param options.sendAllOnType - Ignores logPoolSize when any log with specified type is recieved, then sends all logs
     * @param options.server - Change logging server
     * @public
     */
    setOptions(options: initOptions): void;
    /**
     * Sends all logs in logPool to server and clears the logPool.
     *
     * @returns - Returns a promise that resolves to "SUCCESS" or "ERROR"
     * @public
     */
    flushLogPool(): Promise<string | Response[]>;
    /**
     * Clears all logs in logPool.
     * @public
     */
    clearLogPool(): void;
    /**
     * Returns the logPool.
     * @public
     */
    getLogPool(): {
        data: any;
        options?: logOptions;
    }[];
    private syncLocalStorage;
    private getLocalLogs;
    private internalLog;
    private pushLog;
    private processLogPool;
    private sendRequest;
    private requestFailed;
}
export default Nexys;
//# sourceMappingURL=index.d.ts.map