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

export interface NexysOptions {
  appName?: string;
  debug?: boolean;
  logPoolSize?: number;
  sendAllOnType?: false | logOptionTypes | logOptionTypes[];
  server?: string;
  allowDeviceData?: boolean;
  ignoreType?: false | logOptionTypes | logOptionTypes[];
  ignoreTypeSize?: number;

  errors?: {
    allowAutomaticHandling?: boolean;
  };

  localStorage?: {
    useLocalStorage?: boolean; // use localStorage?
    cryption?: boolean; // use cryption on client, if localStorage is enabled?
    key?: string; // use key on localStorage
    testKey?: string; // use test key on localStorage
    successRequestsMaxSize?: number; // maximum storage length of success requests
    failedRequestsMaxSize?: number; // maximum storage length of failed requests
  };

  _i_EXTREMELY_SECRET_DO_NOT_USE_PLEASE?: boolean;
}

export type logOptionTypes =
  | "DEBUG"
  | "INFO"
  | "WARNING"
  | "ERROR"
  | "FATAL"
  | "AUTO:ERROR"
  | "AUTO:UNHANDLEDREJECTION"
  | "METRIC";
export type logOptionLevels = "LOW" | "MEDIUM" | "HIGH";

export interface logOptions {
  type?: logOptionTypes; // Log type
  level?: logOptionLevels; // Log level
  tags?: string[];
}

export interface logTypes {
  data: any;
  options?: logOptions;
  ts: number;
  guid: string;
}

export interface requestTypes {
  res: string | object;
  status: string;
  ts: number;
}

export interface configTypes {
  user?: string | null;
  client?: string | null;
  appVersion?: string | null;
}

export interface configFunctions {
  setUser: (user: string) => void;
  setClient: (client: string) => void;
  setAppVersion: (version: string) => void;
}
