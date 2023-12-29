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

import { Core } from "./classes/core/index.js";
import { API } from "./classes/API/index.js";
import { Events } from "./classes/events/index.js";
import { InternalLogger } from "./classes/internalLogger/index.js";
import { LocalStorage } from "./classes/localStorage/index.js";
import { LogPool } from "./classes/logPool/index.js";
import { Device } from "./classes/device/index.js";
import loadFromLocalStorage from "./classes/core/loadFromLocalStorage.js";
import checkVersion from "./classes/core/checkVersion.js";
import { guid } from "./utils/guid.js";
import getPagePath from "./utils/getPagePath.js";
import { defaultOptions } from "./utils/index.js";
import type { NexysOptions } from "./types";

/**
 * Nexys Client Library
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
export default class Nexys extends Core {
  /**
   *
   * Documentation
   * @see https://docs.nexys.app
   *
   * Creates a Nexys instance that can be used anywhere in your application.
   *
   * @example
   * ```javascript
   * // Import the client
   * import Nexys from "nexys";
   * // Create a new instance
   * const nexys = new Nexys("API_KEY", { appName: "My_app" });
   * // Initialize the client
   * nexys.init()
   * // Push a log
   * nexys.log("Hello World");
   * ```
   *
   * @param API_KEY - `Required` - `string` - The Public API key you retrieve from our dashboard
   * @param options - `Required` - `object` - Object containing all options below
   * @param options.appName - `Required` - `string` - Name of your application
   * @param options.debug - `Optional` - `boolean` - Enables debug mode for internal logs - Default is `false`
   * @param options.logPoolSize - `Optional` - `number` - Sets the logPool max log size to send when logPool size exceedes this limit - Default is `10`
   * @param options.sendAllOnType - `Optional` - `logOptionTypes | logOptionTypes[] | false` - Ignores logPoolSize when any log with specified type is recieved sends data to API - Default is `["AUTO:ERROR", "AUTO:UNHANDLEDREJECTION", "ERROR"]`
   * @param options.ignoreType - `Optional` - `logOptionTypes | logOptionTypes[] | false` - Ignores logs with specified type (these logs will not count as log and not affect logPool length but will be sent if any request be made) - Default is `"METRIC"`
   * @param options.ignoreTypeSize - `Optional` - `number` - Determine max length of ignored log types could be stored in logPool before sending request - Keeping this number high is preferred - Default is `50`
   * @param options.server - `Optional` - `string` - Change logging server - Default is `https://dash.nexys.app`
   * @param options.allowDeviceData - `Optional` - `boolean` - Should send device data - Collects device data - Default is `true`
   * @param options.allowGeoLocation - `Optional` - `boolean` - Should send geolocation data - Disable if you dont want your users to get notified for geolocation - Default is `false`
   * @param options.allowElementData - `Optional` - `boolean` - Should send body element data - Collects body element data - Default is `true`
   * @param options.clickTrack - `Optional` - `boolean` - Should track clicks - Default is `true`
   * @param options.localStorage - `Optional` - `object` - Object containing options about localStorage
   * @param options.localStorage.useLocalStorage - `Optional` - `boolean` - Should use localStorage - Nexys will try to use localStorage if available if value is true - Default is `true`
   * @param options.localStorage.cryption - `Optional` - `boolean` - Should use cryption on localStorage - Default is `true`
   * @param options.localStorage.key - `Optional` - `string` - Change localStorage key - Default is `__nexysLogPool__`
   * @param options.localStorage.testKey - `Optional` - `string` - Use a different localStorage key for testing localStorage availability - Default is `__nexysTest__`
   * @param options.errors - `Optional` - `object` - Object containing error related options
   * @param options.errors.allowAutomaticHandling - `Optional` - `boolean` - Set automatic error handling - Default is `true`
   *
   * @returns A Nexys instance
   */
  constructor(API_KEY: string, options?: NexysOptions) {
    super(API_KEY, options);
  }

  /**
   * Initializes the client.
   *
   * @example
   * ```javascript
   * // Create a new instance
   * const nexys = new Nexys("API_KEY", { appName: "My_app" });
   * // Initialize the client
   * nexys.init()
   * ```
   *
   * @public
   * @returns {void} - Returns nothing.
   *
   */
  public init(): void {
    if (this._initialized) {
      this.InternalLogger.log(
        "NexysCore: Already initialized but called nexys.init()"
      );
      return;
    }

    let _start: number | null = null,
      _end: number | null = null;
    if (this._isClient) _start = performance.now();

    this.InternalLogger = new InternalLogger({
      active: this._options?.debug ?? false,
    });
    this.Events = new Events(this);
    this.LogPool = new LogPool(this);
    this.API = new API(this, {
      server: this._server,
      apiKey: this._apiKey,
      appName: this._options.appName || "",
    });
    this.Device = new Device(this);
    this.LocalStorage = new LocalStorage(this, {
      key: this._options.localStorage?.key ?? defaultOptions.localStorage?.key,
      testKey:
        this._options.localStorage?.testKey ??
        defaultOptions.localStorage?.testKey,
      isEncrypted:
        this._options.localStorage?.cryption ??
        defaultOptions.localStorage?.cryption,
      active:
        this._options.localStorage?.useLocalStorage ??
        defaultOptions.localStorage?.useLocalStorage,
    });

    Promise.resolve(this.LocalStorage.setup()).then(async () => {
      await loadFromLocalStorage(this);
      checkVersion(this);
    });

    this._initialized = true;

    if (!this._isClient) {
      this.InternalLogger.log(
        "NexysCore: Detected that we are running NexysCore on non client side environment."
      );
      this.InternalLogger.log(
        "NexysCore: Altough NexysCore is designed to run on client side, it can be used on server side as well but some features will might not work."
      );
    }

    // Core Init Event
    this.Events.fire("core.init");

    // Log initialization
    this.InternalLogger.log(
      "NexysCore: Initialized",
      this._version,
      this._options
    );

    if (this._isClient) _end = performance.now();
    if (_start && _end) {
      this.LogPool.push({
        data: {
          type: "CORE:INIT",
          diff: _end - _start,
        },
        ts: new Date().getTime(),
        options: {
          type: "METRIC",
        },
        guid: guid(),
        path: getPagePath(this),
      });
      this.InternalLogger.log(`NexysCore: Initialized in ${_end - _start}ms`);
    }
  }
}
