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
export interface BatteryManager {
    charging?: boolean;
    chargingTime?: number;
    dischargingTime?: number;
    level?: number;
}
type ConnectionType = "bluetooth" | "cellular" | "ethernet" | "mixed" | "none" | "other" | "unknown" | "wifi" | "wimax";
type EffectiveConnectionType = "2g" | "3g" | "4g" | "slow-2g";
type Megabit = number;
type Millisecond = number;
export interface NetworkInformation extends EventTarget {
    readonly type?: ConnectionType;
    readonly effectiveType?: EffectiveConnectionType;
    readonly downlinkMax?: Megabit;
    readonly downlink?: Megabit;
    readonly rtt?: Millisecond;
    readonly saveData?: boolean;
    onchange?: EventListener;
}
export interface getDeviceDataReturnTypes {
    platform?: string | null;
    language?: string | null;
    vendor?: string | null;
    deviceMemory?: number | null;
    hardwareConcurrency?: number | null;
    userAgent?: string | null;
    battery?: BatteryManager | null;
    connection?: NetworkInformation | null;
    geo?: GeolocationPosition | null;
}
export {};
//# sourceMappingURL=types.d.ts.map