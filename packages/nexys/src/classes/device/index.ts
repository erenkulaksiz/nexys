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

import { isClient } from "../../utils/index.js";
import {
  BatteryManager,
  getDeviceDataReturnTypes,
  NetworkInformation,
} from "./types";
import type { Core } from "./../core/index.js";

/**
 * @class Events
 * @description This class is used to handle device information gathering.
 */
export class Device {
  private core: Core;
  private _isAvailable: boolean = false;

  constructor(core: Core) {
    this.core = core;
    this._isAvailable = this.core._isClient && this.checkAvailability();
    this.core.Events.fire("device.init");
  }

  private checkAvailability(): boolean {
    if (typeof navigator !== "undefined") {
      return true;
    }
    return false;
  }

  public getPlatform(): string | null {
    if (!this._isAvailable) return null;
    return navigator.platform;
  }

  public getLanguage(): string | null {
    if (!this._isAvailable) return null;
    return navigator.language;
  }

  public getVendor(): string | null {
    if (!this._isAvailable) return null;
    return navigator.vendor;
  }

  public getDeviceMemory(): number | null {
    if (!this._isAvailable) return null;
    if ("deviceMemory" in navigator) {
      // We are ignoring because deviceMemory is not yet supported by all browsers.
      /** @ts-ignore */
      return navigator.deviceMemory;
    }
    return null;
  }

  public getHardwareConcurrency(): number | null {
    if (!this._isAvailable) return null;
    if ("hardwareConcurrency" in navigator) {
      // We are ignoring because hardwareConcurrency is not yet supported by all browsers.
      /** @ts-ignore */
      return navigator.hardwareConcurrency;
    }
    return null;
  }

  public getGeolocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!this._isAvailable) {
        reject(null);
        return;
      }
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
        return;
      }
      reject(null);
    });
  }

  public getBattery(): Promise<BatteryManager> {
    return new Promise((resolve, reject) => {
      if (!this._isAvailable) {
        reject(null);
        return;
      }
      if ("getBattery" in navigator) {
        // We are ignoring because getBattery is not yet supported by all browsers.
        /** @ts-ignore */
        navigator.getBattery().then(resolve, reject);
      }
      reject(null);
    });
  }

  public getUserAgent(): string | null {
    if (!this._isAvailable) return null;
    if ("userAgent" in navigator) {
      return navigator.userAgent;
    }
    return null;
  }

  public async getConnection(): Promise<NetworkInformation> {
    return new Promise((resolve, reject) => {
      if (!this._isAvailable) {
        reject(null);
        return;
      }
      if ("connection" in navigator) {
        /** @ts-ignore */
        resolve(navigator.connection);
      }
      reject(null);
    });
  }

  public getScreen(): { [key: string]: number } | null {
    if (!this._isAvailable) return null;
    return {
      height: window.screen?.height,
      width: window.screen?.width,
      colorDepth: window.screen?.colorDepth,
      availHeight: window.screen?.availHeight,
      availWidth: window.screen?.availWidth,
      pixelDepth: window.screen?.pixelDepth,
    };
  }

  public async getDeviceData(): Promise<getDeviceDataReturnTypes> {
    if (!this._isAvailable) {
      return Promise.reject(null);
    }
    if (!this.core._allowDeviceData) {
      this.core.InternalLogger.log(
        "Device: Device data is disabled but getDeviceData() is called."
      );
      return Promise.reject(null);
    }
    const battery = await this.getBattery().catch((err) => null);
    const connection = await this.getConnection().catch((err) => null);
    let deviceData = {
      platform: this.getPlatform(),
      language: this.getLanguage(),
      vendor: this.getVendor(),
      deviceMemory: this.getDeviceMemory(),
      hardwareConcurrency: this.getHardwareConcurrency(),
      userAgent: this.getUserAgent(),
      screen: this.getScreen(),
      battery,
      connection,
    } as {
      platform: string | null;
      language: string | null;
      vendor: string | null;
      deviceMemory: number | null;
      hardwareConcurrency: number | null;
      userAgent: string | null;
      screen: { [key: string]: number } | null;
      geo?: GeolocationPosition | null;
      battery?: BatteryManager | null;
      connection?: NetworkInformation | null;
    };
    if (this.core._allowGeoLocation) {
      const geo = await this.getGeolocation().catch((err) => null);
      deviceData = { ...deviceData, geo };
    }
    return Promise.resolve(deviceData);
  }
}
