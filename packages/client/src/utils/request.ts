import fetch, { Response } from "node-fetch";

export interface requestParams {
  server: string;
  url: string;
  method: string;
  body?: any;
  headers?: any;
  apiKey?: string;
}

export function request({
  server,
  url,
  method,
  body,
  headers,
  apiKey,
}: requestParams): Promise<Response> {
  return fetch(`${server}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ data: body, API_KEY: apiKey }),
  }).catch((err) => {
    return err;
  });
}
