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

import type { logTypes, requestTypes } from "src/types";

export interface LocalStorageConstructorParams {
  key: string;
  testKey: string;
  isEncrypted: boolean;
  active: boolean;
}

export interface APIValues {
  client: {
    latestVersion: string;
    softVersion: string;
    hardVersion: string;
  };
  logUsage: number;
  logUsageLimit: number;
  server: {
    dashboard: string;
    version: string;
  };
}

export interface LocalStorageTypes {
  logPool: logTypes[];
  lastLogUpdate: number;
  requests: requestTypes[];
  API?: APIValues;
  userData?: {
    user?: string;
  };
}
