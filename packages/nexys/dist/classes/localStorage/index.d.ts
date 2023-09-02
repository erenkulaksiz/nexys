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
import type { logTypes, requestTypes } from "../../types";
import type { APIValues, LocalStorageConstructorParams, LocalStorageTypes } from "./types";
/**
 * @class LocalStorage
 * @description This class is used to handle internal localStorage operations.
 */
export declare class LocalStorage {
    private core;
    private _localStorage;
    isActive: boolean;
    isEncrypted: boolean;
    isAvailable: boolean;
    key: string;
    testKey: string;
    private shouldUseLocalStorage;
    constructor(core: Core, { key, testKey, isEncrypted, active }: LocalStorageConstructorParams);
    private init;
    private checkAvailability;
    get(): LocalStorageTypes | null;
    set(value: any): void;
    setOverride(value: any): void;
    clear(): void;
    clearLogPool(): void;
    clearRequests(): void;
    addToLogPool({ data, options, guid, path, stack }: logTypes): void;
    addToRequest({ res, status, ts, guid }: requestTypes): void;
    getLocalLogs(): logTypes[] | null;
    getLocalRequests(): requestTypes[] | null;
    getLocalUser(): string | null;
    resetLocalValue(): LocalStorageTypes;
    setAPIValues(value: APIValues): void;
    getAPIValues(): APIValues | null;
    setUser(user: string): void;
}
//# sourceMappingURL=index.d.ts.map