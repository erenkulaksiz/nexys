export interface logErrorReturnTypes {
    success?: boolean;
    status?: number;
    message?: string;
}
export interface logSuccessReturnTypes {
    success?: boolean;
    status?: number;
}
export interface logTypes {
    logMsg: any;
    logTag?: string;
    logType?: "log" | "error";
}
//# sourceMappingURL=log.types.d.ts.map