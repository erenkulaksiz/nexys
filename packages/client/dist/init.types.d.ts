export interface initParams {
    apiKey: string;
    app: string;
    version: string;
    domain: string;
}
export interface initSuccessReturnTypes {
    apiKey?: initParams["apiKey"];
    app?: initParams["app"];
    version?: initParams["version"];
    domain?: initParams["domain"];
    success?: boolean;
    status?: number;
    authToken?: string;
}
export interface initErrorReturnTypes {
    success?: boolean;
    status?: number;
    message?: string;
}
//# sourceMappingURL=init.types.d.ts.map