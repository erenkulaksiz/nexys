import fetch, { Response } from "node-fetch";
import { server } from "./utils";
import type {
  initSuccessReturnTypes,
  initErrorReturnTypes,
  initParams,
} from "./init.types";

/**
 * Creates and initializes a Superlog instance.
 *
 * @example
 * ```javascript
 *
 * // Initialize default app
 * // Retrieve your own options values by adding a web app on
 * // https://console.firebase.google.com
 * init({
 *   apiKey: "AIzaSyDQWc6JY6KzV1r6g8g",
 *   app: "superlog",
 *   version: "1.0.0",
 *   domain: "https://superlog.io",
 * })
 * ```
 *
 * @param {initParams}

 * @returns {Promise<initSuccessReturnTypes | initErrorReturnTypes>}
 *
 * @public
 */
export async function init({
  apiKey,
  app,
  version,
  domain,
}: initParams): Promise<initSuccessReturnTypes | initErrorReturnTypes>;

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
