import { Response } from "node-fetch";
export interface requestParams {
    url: string;
    method: string;
    body?: any;
    headers?: any;
    api_key?: string;
}
export declare function request({ url, method, body, headers, }: requestParams): Promise<Response>;
//# sourceMappingURL=request.d.ts.map