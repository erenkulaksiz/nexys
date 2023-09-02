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
import { Core } from "../core/index.js";
import type { APIConstructorParams, sendRequestParams } from "./types";
export declare class API {
    private core;
    private _server;
    private _apiKey;
    private _appName;
    _sendingRequest: boolean;
    constructor(core: Core, { server, apiKey, appName }: APIConstructorParams);
    sendRequest({ headers, data, }: sendRequestParams): Promise<Response | any>;
    sendData(data: any): Promise<boolean>;
    requestCompleted(): void;
    private checkAvailability;
}
//# sourceMappingURL=index.d.ts.map