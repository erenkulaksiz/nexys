export interface initOptions {
    debug?: boolean;
    logPoolSize?: number;
    sendAllOnType?: null | logOptionTypes | logOptionTypes[];
    server?: string;
    __EXTREMELY_SECRET_DO_NOT_USE_PLEASE?: boolean;
}
export declare type logOptionTypes = "DEBUG" | "INFO" | "WARNING" | "ERROR" | "FATAL";
export declare type logOptionLevels = "LOW" | "MEDIUM" | "HIGH";
export interface logOptions {
    type?: logOptionTypes;
    level?: logOptionLevels;
    tags?: string[];
}
export declare type logReturnType = "SUCCESS" | "SUCCESS:ADD_LOGPOOL" | "ERROR" | "ERROR:INVALID_API_KEY" | "ERROR:INVALID_SERVER" | "ERROR:INVALID_DATA" | "ERROR:INVALID_VERSION" | "ERROR:LOGPOOL_EMPTY";
//# sourceMappingURL=types.d.ts.map