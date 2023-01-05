export interface requestParams {
    server: string;
    url: string;
    method: string;
    body?: any;
    headers?: any;
}
export declare function request({ server, url, method, body, headers, }: requestParams): Promise<Response>;
//# sourceMappingURL=request.d.ts.map