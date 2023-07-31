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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Core } from "./classes/core/index.js";
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
var Nexys = /** @class */ (function (_super) {
    __extends(Nexys, _super);
    /**
     * Creates a Nexys instance that can be used anywhere in your application.
     *
     *  * @example
     * ```javascript
     * // Import the client
     * import Nexys from "nexys";
     * // Initialize the client
     * const nexys = new Nexys("API_KEY", { appName: "My_app" });
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
    function Nexys(API_KEY, options) {
        return _super.call(this, API_KEY, options) || this;
    }
    return Nexys;
}(Core));
export default Nexys;
