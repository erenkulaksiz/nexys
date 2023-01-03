import { request, server, version } from "./utils";
import type { initOptions, logOptions, logReturnType } from "./types";
import { Response } from "node-fetch";

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
  private _options: initOptions = {
    debug: false,
    logPoolSize: 0,
    sendAllOnType: null,
  };
  private _logPool: {
    data: any;
    options?: logOptions;
  }[] = [];
  // Recieved from API
  private _hardUpdate: boolean = false; // Determine if library needs to be hard updated
  private _softUpdate: boolean = false; // Determina if library needs to be soft updated

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
   * @param options.debug - Enables debug mode for internal logs
   * @param options.logPoolSize - Sets the logPool max log size to send when logPool size exceedes this limit
   * @param options.sendAllOnType - Ignores logPoolSize when any log with specified type is recieved, then sends all logs
   * @param options.server - Change logging server
   */
  constructor(API_KEY: string, options?: initOptions) {
    this._apiKey = API_KEY;
    this._options = options || {};
    if (options?.server) {
      this._server = options?.server;
    }
  }

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
  async log(data: any, options?: logOptions): Promise<logReturnType> {
    this._internalLog(data, options);
    return this.pushLog({ data, options });
  }

  /**
   * Logs all details about Nexys instance. Just dont use it.
   */
  __DO_NOT_USE_THIS() {
    this._internalLog(
      this._apiKey,
      this._options,
      this._server,
      this._version,
      this._logPool
    );
  }

  setOptions(options: initOptions) {
    this._options = {
      ...this._options,
      ...options,
    };
  }

  private _internalLog(...args: any) {
    if (this._options?.debug != true) return;
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
    return this.processLogPool();
  }

  private async processLogPool(): Promise<string | Response[]> {
    if (this._logPool.length == 0) {
      throw new Error("Logpool size is 0 in Nexys");
    }

    this._internalLog(
      "Checking internal data",
      this._apiKey,
      this._server,
      this._version
    );
    if (!this._apiKey || this._apiKey.length == 0) {
      throw new Error("No apiKey specified in Nexys constructor");
    }
    if (!this._server) {
      throw new Error("Invalid server key in Nexys");
    }
    if (!this._version) {
      throw new Error("Invalid version key in Nexys");
    }

    if (this._options.sendAllOnType) {
      // Check if theres any logs with specified sendAllOnType option.

      this._logPool.forEach(
        ({ data, options }: { data: any; options?: logOptions }) => {
          if (!options || !options.type) return;

          if (Array.isArray(this._options.sendAllOnType)) {
            if (this._options.sendAllOnType.includes(options.type)) {
              // Send request
              this._internalLog(
                "Sending request due to sendAllOnType",
                this._options.sendAllOnType
              );
              return this.sendRequest({
                data: this._logPool,
              });
            }
            return;
          }
          if (this._options.sendAllOnType == options.type) {
            // Send request
            this._internalLog(
              "Sending request due to sendAllOnType",
              this._options.sendAllOnType
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
      if (this._logPool.length < this._options.logPoolSize) {
        this._internalLog("Added log to logPool");
        return Promise.resolve("SUCCESS:ADD_LOGPOOL");
      }
      this._internalLog("Sending request due to logPool size exceeded");
      return this.sendRequest({
        data: this._logPool,
      });
    }

    this._internalLog("Sending request due to no logPool size");
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
      url: "log",
      method: "POST",
      apiKey: this._apiKey,
      body: data,
    }).then(async (res) => {
      this._logPool = [];
      if (res.status == 200) {
        return await res.json();
      }
      return res;
    });
  }
}

export default Nexys;
