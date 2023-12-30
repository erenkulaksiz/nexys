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

import { Base64 } from "../../utils/index.js";
import type { configTypes, logTypes, requestTypes } from "../../types";
import type {
  APIValues,
  LocalStorageConstructorParams,
  LocalStorageTypes,
} from "./types";
import type { LocalStorageAdapters } from "../../types";
import type { Core } from "../core/index.js";

/**
 * @class LocalStorage
 * @description This class is used to handle internal localStorage operations.
 */
export class LocalStorage {
  private core: Core;
  private _localStorage: LocalStorageAdapters | Storage | null = null;
  public isActive: boolean = false;
  public isEncrypted: boolean = false;
  public isAvailable: boolean = false;
  public key: string = "__nex__";
  public testKey: string = "__nex-t__";

  private shouldUseLocalStorage: boolean = false;

  constructor(
    core: Core,
    { key, testKey, isEncrypted, active }: LocalStorageConstructorParams
  ) {
    this.core = core;
    if (core._useLocalStorageAdapter) {
      if (typeof this.core._options.localStorage?.adapter != "undefined") {
        this._localStorage = this.core._options.localStorage?.adapter;
        this.core.InternalLogger.log(
          "LocalStorage: Adapter",
          this._localStorage
        );
      } else {
        this._localStorage = this.core._isClient ? window?.localStorage : null;
        this.core.InternalLogger.error(
          "LocalStorage: Using localStorage adapter fallback. (window.localStorage)"
        );
      }
    } else {
      this._localStorage = this.core._isClient ? window?.localStorage : null;
      this.core.InternalLogger.log(
        "LocalStorage: Using no localStorage adapter."
      );
    }
    this.key = key;
    this.testKey = testKey;
    this.isEncrypted = isEncrypted;
    this.isActive = active;
  }

  public async setup(): Promise<void> {
    this.core.InternalLogger.log("LocalStorage: Available:", this.isAvailable);

    if (this.isActive) {
      this.isAvailable = await this.checkAvailability();
      this.core.InternalLogger.log("LocalStorage: Set to Active");
      // We will not going to use localStorage if library is loaded in server environment.
      this.shouldUseLocalStorage =
        this.isAvailable && this._localStorage && this.core._isClient
          ? true
          : false;
      if (this.shouldUseLocalStorage) {
        this.core.InternalLogger.log("LocalStorage: Using localStorage.");
      } else {
        this.core.InternalLogger.log("LocalStorage: Not using localStorage.");
      }
    }

    await this.init();
  }

  private async init(): Promise<void> {
    if (!this.shouldUseLocalStorage) return;
    this.core.InternalLogger.log("LocalStorage: Initializing...");
    let localItem = await this.get();
    if (localItem) {
      this.core.InternalLogger.log(
        "LocalStorage: Found local item:",
        localItem
      );
    } else {
      this.core.InternalLogger.log("LocalStorage: No local item found.");
      localItem = await this.resetLocalValue();
    }
    this.core.Events.fire("localstorage.init", localItem);
  }

  public async removeItem(key: string): Promise<void> {
    if (!this.shouldUseLocalStorage) return;
    this.core.InternalLogger.log("LocalStorage: Removing...", key);
    await this._localStorage?.removeItem(key);
  }

  public async setItem(key: string, value: any): Promise<void> {
    if (!this.shouldUseLocalStorage) return;
    //this.core.InternalLogger.log("LocalStorage: Setting...", value);
    await this._localStorage?.setItem(key, value);
  }

  public async getItem(key: string): Promise<any> {
    if (!this.shouldUseLocalStorage) return null;
    //this.core.InternalLogger.log("LocalStorage: Getting...", key);
    return await this._localStorage?.getItem(key);
  }

  public async checkAvailability(): Promise<boolean> {
    if (!this.core._isClient) return false;
    this.core.InternalLogger.log("LocalStorage: Checking availability...");
    if (typeof this._localStorage == "undefined") {
      this.core.InternalLogger.log(
        "LocalStorage: Not available - cant check availability."
      );
      return false;
    }
    try {
      this.core.InternalLogger.log("LocalStorage: Checking setItem...");
      await this._localStorage?.setItem(this.testKey, this.testKey);
      const item = await this._localStorage?.getItem(this.testKey);
      this.core.InternalLogger.log("LocalStorage: Checking Item:", item);
      if (item != this.testKey) {
        this.core.InternalLogger.log(
          "LocalStorage: Not available - item is not equal to testKey."
        );
        return false;
      }
      await this._localStorage?.removeItem(this.testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Returns any since item can be anything
  public async get(): Promise<LocalStorageTypes | null> {
    if (!this.shouldUseLocalStorage) return null;
    let localItem = null;
    let parsed = null;

    try {
      localItem = await this?.getItem(this.key);

      if (!localItem) {
        return null;
      }
    } catch (e) {
      return null;
    }

    if (this.isEncrypted) {
      // Decode with Base64.
      try {
        localItem = Base64.decode(localItem);
      } catch (e) {
        this.resetLocalValue(); // Reset localStorage so we can start fresh.
        return null;
      }
    }

    try {
      parsed = JSON.parse(localItem);
    } catch (e) {
      this.resetLocalValue(); // Reset localStorage so we can start fresh.
      return null;
    }

    return parsed;
  }

  public async set(value: any): Promise<void> {
    if (!this.shouldUseLocalStorage) return;
    let localItem = value;

    try {
      localItem = JSON.stringify(localItem);
    } catch (e) {
      return;
    }

    if (this.isEncrypted) {
      // Encode with Base64.
      try {
        localItem = Base64.encode(localItem);
      } catch (e) {
        return;
      }
    }

    try {
      await this?.setItem(this.key, localItem);
    } catch (e) {
      return;
    }
  }

  // This function overrides specified values.
  public async setOverride(value: any): Promise<void> {
    if (!this.shouldUseLocalStorage) return;
    let localValue = await this.get();
    const merged = Object.assign({}, value, localValue);
    await this.set(merged);
  }

  public async clearLogPool(): Promise<void> {
    if (!this.shouldUseLocalStorage) return;
    const localValue = await this.get();
    if (!localValue) {
      this.core.InternalLogger.log(
        "LocalStorage: Local value is null in clearLogPool."
      );
      this.resetLocalValue();
      return;
    }
    localValue.logPool = [];
    this.set(localValue);
  }

  public async clearRequests(): Promise<void> {
    if (!this.shouldUseLocalStorage) return;
    const localValue = await this.get();
    if (!localValue) {
      this.core.InternalLogger.log(
        "LocalStorage: Local value is null in clearRequests."
      );
      this.resetLocalValue();
      return;
    }
    localValue.requests = [];
    this.set(localValue);
  }

  public async addToLogPool({
    data,
    options,
    guid,
    path,
    stack,
  }: logTypes): Promise<void> {
    if (!this.shouldUseLocalStorage) return;
    let localValue = await this.get();
    if (!localValue) {
      this.core.InternalLogger.log(
        "LocalStorage: Local value is null in addToLogPool."
      );
      await this.resetLocalValue();
      // Resets and pushes first log.
      localValue = {
        logPool: [
          { ts: new Date().getTime(), data, options, guid, path, stack },
        ],
        requests: [],
        lastLogUpdate: new Date().getTime(),
      };
      await this.set(localValue);
      return;
    }
    localValue.logPool.push({
      ts: new Date().getTime(),
      data,
      options,
      guid,
      path,
      stack,
    });
    localValue.lastLogUpdate = new Date().getTime();
    await this.set(localValue);
  }

  public async addToRequest({
    res,
    status,
    ts,
    guid,
  }: requestTypes): Promise<void> {
    if (!this.shouldUseLocalStorage) return;
    let localValue = await this.get();
    if (!localValue) {
      this.core.InternalLogger.log(
        "LocalStorage: Local value is null in addToRequest."
      );
      await this.resetLocalValue();
      // Resets and pushes first log.
      localValue = {
        logPool: [],
        requests: [{ res, status, ts, guid }],
        lastLogUpdate: 0,
      };
      await this.set(localValue);
      return;
    }
    localValue.requests.push({ res, status, ts, guid });
    await this.set(localValue);
  }

  public async getLocalLogs(): Promise<logTypes[] | null> {
    if (!this.shouldUseLocalStorage) return null;
    let localValue = await this.get();
    if (!localValue) {
      this.core.InternalLogger.log(
        "LocalStorage: Local value is null in getLocalLogs."
      );
      const { logPool } = await this.resetLocalValue();
      return logPool;
    }
    return localValue?.logPool;
  }

  public async getLocalRequests(): Promise<requestTypes[] | null> {
    if (!this.shouldUseLocalStorage) return null;
    let localValue = await this.get();
    if (!localValue) {
      this.core.InternalLogger.log(
        "LocalStorage: Local value is null in getLocalRequests."
      );
      const { requests } = await this.resetLocalValue();
      return requests;
    }
    return localValue?.requests;
  }

  public async resetLocalValue(): Promise<LocalStorageTypes> {
    this.core.InternalLogger.log(
      "LocalStorage: Resetting local value in resetLocalValue."
    );
    const val = {
      logPool: [],
      requests: [],
      lastLogUpdate: 0,
    };
    await this.set(val);
    return val;
  }

  public async setAPIValues(value: APIValues): Promise<void> {
    if (!this.shouldUseLocalStorage) return;
    let localValue = await this.get();
    if (!localValue) {
      this.core.InternalLogger.log(
        "LocalStorage: Local value is null in setAPIValue."
      );
      this.resetLocalValue();
      localValue = await this.get();
      return;
    }
    localValue.API = value;
    this.set(localValue);
  }

  public async getAPIValues(): Promise<APIValues | null> {
    if (!this.shouldUseLocalStorage) return null;
    let localValue = await this.get();
    if (!localValue) {
      this.core.InternalLogger.log(
        "LocalStorage: Local value is null in getAPIValue."
      );
      return null;
    }
    return localValue.API || null;
  }

  public async setConfigValue(
    key: keyof configTypes,
    value: string
  ): Promise<void> {
    if (!this.shouldUseLocalStorage) {
      this.core.InternalLogger.log(
        "LocalStorage: Not using localStorage in setConfigValue."
      );
      return;
    }
    let localValue = await this.get();
    if (!localValue) {
      this.core.InternalLogger.log(
        "LocalStorage: Local value is null in setUser."
      );
      await this.resetLocalValue();
      localValue = await this.get();
      return;
    }
    if (!localValue.config) {
      localValue.config = {};
    }
    localValue.config[key] = value;
    await this.set(localValue);
  }

  public async getConfigValue(key: keyof configTypes) {
    if (!this.shouldUseLocalStorage) return null;
    let localValue = await this.get();
    if (!localValue) {
      this.core.InternalLogger.log(
        "LocalStorage: Local value is null in getAPIValue."
      );
      return null;
    }
    return localValue?.config?.[key] || null;
  }
}
