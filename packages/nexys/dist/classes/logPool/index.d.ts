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
import type { requestTypes } from "../../types";
import type { logTypes } from "./../../types";
export declare class LogPool {
    private core;
    logs: logTypes[];
    requests: requestTypes[];
    constructor(core: Core);
    setLogs(logs: logTypes[]): void;
    setRequests(requests: requestTypes[]): void;
    push({ data, options, ts, guid, path, stack }: logTypes): void;
    pushRequest({ res, status, ts, guid }: requestTypes): void;
    clearLogs(): void;
    clearRequests(): void;
    /**
     * Process internal data to determine whether or not we should need to send data to the server.
     */
    process(): void;
    /**
     * Sends all data on Nexys to the server.
     */
    sendAll(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map