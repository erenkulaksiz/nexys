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

import { isClient } from "../../utils";
import { BatteryManager, getDeviceDataReturnTypes, NetworkInformation } from "./types";

export class Device {
  private _isAvailable: boolean = false;

  constructor() {
    this._isAvailable = isClient() && this.checkAvailability();
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
      if (!navigator?.geolocation?.getCurrentPosition) {
        reject(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
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

  public getScreen(): { height: number; width: number } | null {
    if (!this._isAvailable) return null;
    return {
      height: window.screen.height,
      width: window.screen.width,
    };
  }

  public async getDeviceData(): Promise<getDeviceDataReturnTypes>{
    if (!this._isAvailable){
      return Promise.reject(null);
    }
    const battery = await this.getBattery().catch((err) => null);
    const connection = await this.getConnection().catch((err) => null);;
    const geo = await this.getGeolocation().catch((err) => null);;
    return Promise.resolve({
      platform: this.getPlatform(),
      language: this.getLanguage(),
      vendor: this.getVendor(),
      deviceMemory: this.getDeviceMemory(),
      hardwareConcurrency: this.getHardwareConcurrency(),
      userAgent: this.getUserAgent(),
      battery: {
        charging: battery?.charging,
        chargingTime: battery?.chargingTime,
        dischargingTime: battery?.dischargingTime,
        level: battery?.level,
      },
      connection,
      geo
    });
  }
}
