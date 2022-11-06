import fetch, { Response } from "node-fetch";
import { server } from "./utils";
import type {
  initSuccessReturnTypes,
  initErrorReturnTypes,
  initParams,
} from "./init.types";

export async function init({
  apiKey,
  app,
  version,
  domain,
}: initParams): Promise<initSuccessReturnTypes | initErrorReturnTypes> {
  const data = await fetch(`${server}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey,
      app,
      version,
      domain,
    }),
  })
    .then((response: Response) => response.json())
    .catch((err) => {
      return err;
    });
  if (data.success) {
    return Promise.resolve({
      success: data.success,
      status: data.status,
      authToken: data.authToken,
    });
  }
  return Promise.reject({
    success: false,
    status: data.status ?? 500,
    message: data.message,
  });
}
