import {
  request,
  server,
  debugServer,
  version,
  canUseLocalStorage,
  Base64,
} from "./utils";
import type {
  initOptions,
  logOptions,
  logReturnType,
  localStorageType,
} from "./types";

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
class Nexys {
  public _server: string = server;
  public _version: string = version;
  private _apiKey: string;
  private _appName: string;
  private _isLocalStorageAvailable: boolean = false;
  private _useBase64: boolean = true;
  private _localStorageKey: string = "__nexysLogPool__";
  private _localStorageTestKey: string = "__nexysTest__";
  private _options: initOptions = {
    logPoolSize: 5,
    useCryptionOnLocalStorage: true,
  };
  private _logPool: {
    data: any;
    options?: logOptions;
  }[] = [];
  // Recieved from API
  private _hardUpdate: boolean = false; // Determine if library needs to be hard updated
  private _softUpdate: boolean = false; // Determine if library needs to be soft updated

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
  constructor(API_KEY: string, options?: initOptions) {
    if (!API_KEY || typeof API_KEY !== "string" || API_KEY.length == 0)
      throw new Error("Nexys: Please specify API_KEY in constructor");
    this._apiKey = API_KEY;
    this._options = {
      ...this._options,
      ...options,
    };
    if (!this._options.appName)
      throw new Error("Nexys: Please specify appName in constructor options");
    this._appName = this._options.appName; // App name is required
    this.internalLog("Initialized");
    if (this._options?.useLocalStorageKey) {
      this._localStorageKey = this._options.useLocalStorageKey;
    }
    if (options?.server && !options?.debug) {
      this._server = options?.server;
    }
    if (!options?.server && options?.debug) {
      this._server = debugServer;
    }
    if (options?.server && options?.debug) {
      this._server = options.server;
    }
    // Check if localStorage is available
    if (this._options?.useLocalStorageTestKey) {
      this._localStorageTestKey = this._options.useLocalStorageTestKey;
    }
    // Check if storage type is available
    if (this._options?.storeInLocalStorage) {
      this._isLocalStorageAvailable = canUseLocalStorage(
        this._localStorageTestKey
      );
    }
    this._useBase64 = this._options?.useCryptionOnLocalStorage ? true : false;
    this.getLocalLogs();
    this.internalLog("Options", this._options);
  }

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
  async log(data: any, options?: logOptions): Promise<logReturnType> {
    this.internalLog(data, options);
    return this.pushLog({ data, options });
  }

  /**
   * Logs all details about Nexys instance. Just dont use it.
   * @public
   */
  __DO_NOT_USE_THIS() {
    this.internalLog(this);
  }

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
  setOptions(options: initOptions) {
    this._options = {
      ...this._options,
      ...options,
    };
  }

  /**
   * Sends all logs in logPool to server and clears the logPool.
   *
   * @returns - Returns a promise that resolves to "SUCCESS" or "ERROR"
   * @public
   */
  async flushLogPool(): Promise<string | Response[]> {
    this.getLocalLogs();
    return this.sendRequest({
      data: this._logPool,
    });
  }

  /**
   * Clears all logs in logPool.
   * @public
   */
  clearLogPool(): void {
    if (this._isLocalStorageAvailable && this._options?.storeInLocalStorage) {
      localStorage.removeItem(this._localStorageKey);
    }
    this._logPool = [];
  }

  /**
   * Returns the logPool.
   * @public
   */
  getLogPool(): {
    data: any;
    options?: logOptions;
  }[] {
    this.getLocalLogs();
    return this._logPool;
  }

  private syncLocalStorage(): void {
    if (!this._options.storeInLocalStorage) {
      throw new Error(
        "Nexys: storeInLocalStorage is not enabled but syncLocalStorage was called."
      );
    }
    if (!this._isLocalStorageAvailable) {
      this.internalLog("LocalStorage is not available.");
      return;
    }
    try {
      if (this._useBase64) {
        localStorage.setItem(
          this._localStorageKey,
          Base64.encode(
            JSON.stringify({
              lastUpdate: new Date().getTime(),
              data: this._logPool,
            })
          )
        );
        return;
      }
      localStorage.setItem(
        this._localStorageKey,
        JSON.stringify({
          lastUpdate: new Date().getTime(),
          data: this._logPool,
        })
      );
    } catch (e) {
      this.internalLog("Error saving logs to localStorage", e);
    }
  }

  private getLocalLogs(): void {
    if (!this._options.storeInLocalStorage) return; // If localStorage is not enabled, return
    if (!this._isLocalStorageAvailable) {
      // If localStorage is not available, return
      this.internalLog("LocalStorage is not available.");
      return;
    }
    const storedLogs = localStorage.getItem(this._localStorageKey);
    if (storedLogs) {
      try {
        let parsed;
        if (this._useBase64) {
          parsed = JSON.parse(Base64.decode(storedLogs));
        } else {
          parsed = JSON.parse(storedLogs);
        }
        if (
          !parsed["data"] ||
          !Array.isArray(parsed["data"]) ||
          !parsed["lastUpdate"]
        )
          throw new Error("Nexys: Invalid data in localStorage");
        this._logPool = parsed["data"] as localStorageType["data"];
        this.internalLog(
          "Time diff of local: ",
          new Date().getTime() - parsed.lastUpdate
        );
        this.processLogPool();
      } catch (e) {
        this.internalLog("Error parsing logs from localStorage", e);
        localStorage.removeItem(this._localStorageKey);
        return;
      }
      this.internalLog(
        `Found ${this._logPool.length} log(s) in localStorage.`,
        this._logPool
      );
      return;
    }
    this.internalLog("No logs found in localStorage.");
    return;
  }

  private internalLog(...args: any): void {
    if (this._options?.debug != true) return;
    if (typeof console?.log == "undefined") return;
    console.log("[NEXYS-DEBUG]: ", ...args);
  }

  private async pushLog({
    data,
    options,
  }: {
    data: any;
    options?: logOptions;
  }): Promise<any> {
    this._logPool.push({ data, options });
    if (this._options.storeInLocalStorage) {
      this.syncLocalStorage();
    }
    return this.processLogPool();
  }

  private async processLogPool(): Promise<string | Response[]> {
    if (this._logPool.length == 0) {
      throw new Error("Nexys: logPool size is 0 but processLogPool was called");
    }

    this.internalLog(
      "Checking internal data",
      this._apiKey,
      this._server,
      this._version
    );
    if (!this._apiKey || this._apiKey.length == 0) {
      throw new Error("Nexys: No apiKey specified in constructor");
    }
    if (!this._server) {
      throw new Error("Nexys: Invalid server key");
    }
    if (!this._version) {
      throw new Error("Nexys: Invalid version key");
    }

    if (this._options.sendAllLogsOnType) {
      // Check if theres any logs with specified sendAllLogsOnType option.

      this._logPool.forEach(
        ({ data, options }: { data: any; options?: logOptions }) => {
          if (!options || !options.type) return;

          if (Array.isArray(this._options.sendAllLogsOnType)) {
            if (this._options.sendAllLogsOnType.includes(options.type)) {
              // Send request
              this.internalLog(
                "Sending request due to sendAllLogsOnType",
                this._options.sendAllLogsOnType
              );
              return this.sendRequest({
                data: this._logPool,
              });
            }
            return;
          }
          if (this._options.sendAllLogsOnType == options.type) {
            // Send request
            this.internalLog(
              "Sending request due to sendAllLogsOnType",
              this._options.sendAllLogsOnType
            );
            return this.sendRequest({
              data: this._logPool,
            });
          }
        }
      );
    }

    if (this._options?.logPoolSize) {
      // there is logPoolSize option
      if (this._logPool.length <= this._options.logPoolSize) {
        this.internalLog("logPool size is less than logPoolSize option");
        return Promise.resolve("SUCCESS:LOGPOOLSIZE");
      }
      this.internalLog("Sending request due to logPool size exceeded");
      return this.sendRequest({
        data: this._logPool,
      });
    }

    this.internalLog("Sending request due to no logPool size");
    // no logPoolSize option
    return this.sendRequest({
      data: {
        data: this._logPool[0].data,
        options: this._logPool[0].options,
      },
    });
  }

  private sendRequest({ data }: { data: any }) {
    return request({
      server: this._server,
      url: `log/${this._apiKey}/${this._appName}`,
      method: "POST",
      body: data,
    }).then(async (res) => {
      if (res.status == 200) {
        this.clearLogPool();
        return await res.json();
      }
      this.requestFailed(res);
      return res;
    });
  }

  private requestFailed(res: Response) {
    this.internalLog("Request failed", res);
  }
}

export default Nexys;
