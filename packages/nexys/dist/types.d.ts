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
import type { Core } from "./classes/core";
import type { getDeviceDataReturnTypes } from "src/classes/device/types.js";
export interface NexysOptions {
    appName?: string;
    debug?: boolean;
    logPoolSize?: number;
    sendAllOnType?: false | logOptionTypes | logOptionTypes[];
    server?: string;
    allowDeviceData?: boolean;
    allowGeoLocation?: boolean;
    allowElementData?: boolean;
    ignoreType?: false | logOptionTypes | logOptionTypes[];
    ignoreTypeSize?: number;
    errors?: {
        allowAutomaticHandling?: boolean;
    };
    localStorage?: {
        useLocalStorage?: boolean;
        useAdapter?: boolean;
        adapter?: LocalStorageAdapters;
        cryption?: boolean;
        key?: string;
        testKey?: string;
        successRequestsMaxSize?: number;
        failedRequestsMaxSize?: number;
    };
}
export type logActionTypes = string;
export type logOptionTypes = "DEBUG" | "INFO" | "WARNING" | "ERROR" | "FATAL" | "AUTO:ERROR" | "AUTO:UNHANDLEDREJECTION" | "METRIC";
export type logOptionLevels = "LOW" | "MEDIUM" | "HIGH";
export interface logOptions {
    type?: logOptionTypes;
    level?: logOptionLevels;
    tags?: string[];
    action?: logActionTypes;
}
export interface logTypes {
    data: any;
    options?: logOptions;
    path?: string | null;
    ts: number;
    guid: string;
    stack?: string;
}
export interface errorLogTypes {
    data: {
        message: string;
        errmessage?: string;
        stack?: string;
        type?: string;
        colno?: string;
        lineno?: string;
        filename?: string;
        defaultPrevented?: boolean;
        isTrusted?: boolean;
        timeStamp?: number;
    };
    options?: logOptions;
    path?: string | null;
    ts: number;
    guid: string;
    stack?: string;
}
export interface requestTypes {
    res: string | object;
    status: string;
    ts: number;
    guid: string;
}
export interface configTypes {
    user?: string | null;
    platform?: string | null;
    appVersion?: string | null;
}
export interface configFunctions {
    setUser: (user: string) => void;
    setPlatform: (platform: string) => void;
    setAppVersion: (version: string) => void;
}
export interface collectDataTypes {
    logs?: logTypes[];
    requests?: requestTypes[];
    deviceData: getDeviceDataReturnTypes | "disabled" | "client-disabled";
    package: {
        libraryName: string;
        version: string;
    };
    options: {
        logPoolSize: number;
        allowDeviceData: boolean;
        sendAllOnType: NexysOptions["sendAllOnType"];
        ignoreType: NexysOptions["ignoreType"];
        ignoreTypeSize: number;
    };
    env: {
        type: string;
        isClient: boolean;
    };
    config?: configTypes;
}
declare global {
    interface Window {
        nexys: Core;
    }
}
export interface LocalStorageAdapters {
    getItem: (key: string) => Promise<any>;
    setItem: (key: string, value: any) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
}
//# sourceMappingURL=types.d.ts.map