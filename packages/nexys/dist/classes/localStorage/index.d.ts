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
import type { configTypes, logTypes, requestTypes } from "../../types";
import type { APIValues, LocalStorageConstructorParams, LocalStorageTypes } from "./types";
import type { Core } from "../core/index.js";
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
    setup(): Promise<void>;
    private init;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: any): Promise<void>;
    getItem(key: string): Promise<any>;
    checkAvailability(): Promise<boolean>;
    get(): Promise<LocalStorageTypes | null>;
    set(value: any): Promise<void>;
    setOverride(value: any): Promise<void>;
    clearLogPool(): Promise<void>;
    clearRequests(): Promise<void>;
    addToLogPool({ data, options, guid, path, stack, }: logTypes): Promise<void>;
    addToRequest({ res, status, ts, guid, }: requestTypes): Promise<void>;
    getLocalLogs(): Promise<logTypes[] | null>;
    getLocalRequests(): Promise<requestTypes[] | null>;
    resetLocalValue(): Promise<LocalStorageTypes>;
    setAPIValues(value: APIValues): Promise<void>;
    getAPIValues(): Promise<APIValues | null>;
    setConfigValue(key: keyof configTypes, value: string): Promise<void>;
    getConfigValue(key: keyof configTypes): Promise<string | null>;
}
//# sourceMappingURL=index.d.ts.map