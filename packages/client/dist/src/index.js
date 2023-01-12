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
import { NexysCore } from "./classes/core";
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
     * @param API_KEY - `Required` - The Public API key you retrieve from our dashboard
     * @param options - `Required` - Object containing all options below
     * @param options.appName - `Required` - Name of your application
     * @param options.debug - `Optional` - Enables debug mode for internal logs - also uses debug server - Default is `false`
     * @param options.logPoolSize - `Optional` - Sets the logPool max log size to send when logPool size exceedes this limit - Default is `5`
     * @param options.sendAllOnType - `Optional` - Ignores logPoolSize when any log with specified type is recieved, then sends all logs in logPool - Default is `null`
     * @param options.server - `Optional` - Change logging server - Default is `https://api.nexys.dev`
     * @param options.localStorage - `Optional` - Object containing options about localStorage
     * @param options.localStorage.useLocalStorage - `Optional` - Should use localStorage - Default is `true`
     * @param options.localStorage.cryption - `Optional` - Should use cryption on localStorage - Default is `true`
     * @param options.localStorage.key - `Optional` - Change localStorage key - Default is `__nexysLogPool__`
     * @param options.localStorage.testKey - `Optional` - Use a different localStorage key for testing localStorage availability - Default is `__nexysTest__`
     * @param options.localStorage.successRequestsMaxSize - `Optional` - We store each request send to API in localStorage. This value determines how many requests we can store except failed ones (successful) - Default is `20`
     * @param options.localStorage.failedRequestsMaxSize - `Optional` - How many failed requests we can store in localStorage - Default is `50`
     * @param options.errors.allowAutomaticHandling - `Optional` - Set automatic error handling - Default is `true`
     */
    function Nexys(API_KEY, options) {
        var _this = _super.call(this, API_KEY, options) || this;
        _this.log = _super.prototype.log;
        return _this;
    }
    return Nexys;
}(NexysCore));
export default Nexys;
