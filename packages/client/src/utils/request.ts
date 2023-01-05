export interface requestParams {
  server: string;
  url: string;
  method: string;
  body?: any;
  headers?: any;
}

export function request({
  server,
  url,
  method,
  body,
  headers,
}: requestParams): Promise<Response> {
  if (typeof fetch === "undefined")
    throw new Error("fetch is not defined (node environment)");

  return fetch(`${server}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  }).catch((err) => {
    return err;
  });
}
