import { Response } from "node-fetch";
export interface requestParams {
    server: string;
    url: string;
    method: string;
    body?: any;
    headers?: any;
    apiKey?: string;
}
export declare function request({ server, url, method, body, headers, apiKey, }: requestParams): Promise<Response>;
//# sourceMappingURL=request.d.ts.map