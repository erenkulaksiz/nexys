import fetch, { Response } from "node-fetch";
import { server } from "./utils";

export function request({
  url,
  method,
  body,
  headers,
}: {
  url: string;
  method: string;
  body?: any;
  headers?: any;
}): Promise<Response> {
  return fetch(`${server}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}
