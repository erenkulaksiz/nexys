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

import { NexysCore } from "../core";
import type { InternalLoggerConstructorParams } from "./types";

/**
 * @class InternalLogger
 * @description This class is used to log internal errors or debug related logs to the console.
 */
export class InternalLogger {
  private core: NexysCore;
  private _active: boolean = false;
  public isAvailable: boolean = false;

  constructor(core: NexysCore, { active }: InternalLoggerConstructorParams) {
    this.core = core;
    this._active = active;
    this.isAvailable = this.checkAvailability();
    if (this.isAvailable && this._active) this.log("InternalLogger: Active");
  }

  private checkAvailability(): boolean {
    try {
      if (typeof console !== "undefined" && typeof console.log === "function") {
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  public log(...args: any[]): void {
    if (!this._active || !this.isAvailable) return;
    console.log("[NEXYS-DEBUG]: ", ...args);
  }
}
