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

import { Base64, isClient } from "../../utils";
import { NexysCore } from "../core";
import type { logTypes, requestTypes } from "../../types";
import type { LocalStorageConstructorParams, LocalStorageTypes } from "./types";

/**
 * @class LocalStorage
 * @description This class is used to handle internal localStorage operations.
 */
export class LocalStorage {
  private core: NexysCore;
  private _localStorage: Storage | null = null;
  public isActive: boolean = false;
  public isEncrypted: boolean = false;
  public isAvailable: boolean = false;
  public key: string = "__nexys__";
  public testKey: string = "__nexysTest__";

  private shouldUseLocalStorage: boolean = false;

  constructor(
    core: NexysCore,
    { key, testKey, isEncrypted, active }: LocalStorageConstructorParams
  ) {
    this.core = core;
    this._localStorage = isClient() ? window?.localStorage : null;
    this.key = key;
    this.testKey = testKey;
    this.isEncrypted = isEncrypted;
    this.isActive = active;
    this.isAvailable = this.checkAvailability();

    this.core.InternalLogger.log("LocalStorage: Available:", this.isAvailable);

    if (this.isActive) {
      this.core.InternalLogger.log("LocalStorage: Set to Active");
      // We will not going to use localStorage if library is loaded in server environment.
      this.shouldUseLocalStorage =
        this.isAvailable && this._localStorage && isClient() ? true : false;
      if (this.shouldUseLocalStorage) {
        this.core.InternalLogger.log("LocalStorage: Using localStorage.");
      } else {
        this.core.InternalLogger.log("LocalStorage: Not using localStorage.");
      }
    }

    this.init();
  }

  private init(): void {
    if (!this.shouldUseLocalStorage) return;
    this.core.InternalLogger.log("LocalStorage: Initializing...");
    let localItem = this.get();
    if (localItem) {
      this.core.InternalLogger.log(
        "LocalStorage: Found local item:",
        localItem
      );
    } else {
      this.core.InternalLogger.log("LocalStorage: No local item found.");
      localItem = this.resetLocalValue();
    }
    this.core.Events.on.localStorageInit?.(localItem);
  }

  private checkAvailability(): boolean {
    // Check if we have localStorage object.
    if (typeof this._localStorage === "undefined") return false;
    try {
      localStorage.setItem(this.testKey, this.testKey);
      localStorage.removeItem(this.testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Returns any since item can be anything
  public get(): LocalStorageTypes | null {
    if (!this.shouldUseLocalStorage) return null;
    let localItem = null;
    let parsed = null;

    try {
      localItem = this?._localStorage?.getItem(this.key);

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
        this.clear(); // Clear localStorage so we can start fresh.
        return null;
      }
    }

    try {
      parsed = JSON.parse(localItem);
    } catch (e) {
      this.clear(); // Clear localStorage so we can start fresh.
      return null;
    }

    return parsed;
  }

  public set(value: any): void {
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
      this?._localStorage?.setItem(this.key, localItem);
    } catch (e) {
      return;
    }
  }

  // This function overrides specified values.
  public setOverride(value: any): void {
    if (!this.shouldUseLocalStorage) return;
    let localValue = this.get();
    const merged = Object.assign({}, value, localValue);
    this.set(merged);
  }

  public clear(): void {
    if (!this.shouldUseLocalStorage) return;
    this.core.InternalLogger.log("LocalStorage: Clearing everything.");
    this?._localStorage?.clear();
  }

  public clearLogPool(): void {
    if (!this.shouldUseLocalStorage) return;
    const localValue = this.get();
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

  public clearRequests(): void {
    if (!this.shouldUseLocalStorage) return;
    const localValue = this.get();
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

  public addToLogPool({ data, options }: logTypes): void {
    if (!this.shouldUseLocalStorage) return;
    let localValue = this.get();
    if (!localValue) {
      this.core.InternalLogger.log("LocalStorage: Local value is null.");
      this.resetLocalValue();
      // Resets and pushes first log.
      localValue = {
        logPool: [{ ts: new Date().getTime(), data, options }],
        requests: [],
        lastLogUpdate: new Date().getTime(),
      };
      this.set(localValue);
      return;
    }
    localValue.logPool.push({
      ts: new Date().getTime(),
      data,
      options,
    });
    localValue.lastLogUpdate = new Date().getTime();
    this.set(localValue);
  }

  public addToRequest({ res, status, ts }: requestTypes): void {
    if (!this.shouldUseLocalStorage) return;
    let localValue = this.get();
    if (!localValue) {
      this.core.InternalLogger.log("LocalStorage: Local value is null.");
      this.resetLocalValue();
      // Resets and pushes first log.
      localValue = {
        logPool: [],
        requests: [{ res, status, ts }],
        lastLogUpdate: 0,
      };
      this.set(localValue);
      return;
    }
    localValue.requests.push({ res, status, ts });
    this.set(localValue);
  }

  public getLocalLogs(): logTypes[] | null {
    if (!this.shouldUseLocalStorage) return null;
    let localValue = this.get();
    if (!localValue) {
      this.core.InternalLogger.log("LocalStorage: Local value is null.");
      return this.resetLocalValue().logPool;
    }
    return localValue?.logPool;
  }

  public getLocalRequests(): requestTypes[] | null {
    if (!this.shouldUseLocalStorage) return null;
    let localValue = this.get();
    if (!localValue) {
      this.core.InternalLogger.log("LocalStorage: Local value is null.");
      return this.resetLocalValue().requests;
    }
    return localValue?.requests;
  }

  public resetLocalValue(): LocalStorageTypes {
    this.core.InternalLogger.log("LocalStorage: Resetting local value.");
    const val = {
      logPool: [],
      requests: [],
      lastLogUpdate: 0,
    };
    this.set(val);
    return val;
  }
}
