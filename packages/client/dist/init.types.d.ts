export interface initSettingsTypes {
    logToConsole?: boolean;
    logTreshold?: number;
}
export interface initParams {
    apiKey: string;
    app: string;
    version: string;
    domain: string;
}
export interface initReturnTypes extends initParams {
}
export interface initErrorReturnTypes {
    success?: boolean;
    status?: number;
    message?: string;
}
export interface internalDataTypes extends initParams {
    apiKey: string;
    settings: initSettingsTypes;
}
//# sourceMappingURL=init.types.d.ts.map