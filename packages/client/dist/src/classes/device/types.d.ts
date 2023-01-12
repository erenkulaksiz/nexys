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