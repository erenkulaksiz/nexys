import { Response } from "node-fetch";
import type {
  initSuccessReturnTypes,
  initErrorReturnTypes,
  initParams,
} from "./init.types";
import { request } from "./request";
import { log as internalLog } from "./log";
import { logSuccessReturnTypes, logErrorReturnTypes } from "./log.types";

let authToken = "";

/**
 * Creates and initializes a Superlog instance.
 *
 * @example
 * ```javascript
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
  if (apiKey.length != 16)
    return Promise.reject({
      success: false,
      status: 401,
      message: "auth/invalid-api-key",
    });
  // Once token is recieved, we will not going to store it in localstorage.
  // We will store it in memory and use it for all the subsequent requests.
  const data = await request({
    url: "auth",
    method: "POST",
    body: { apiKey, app, version, domain },
  })
    .then((response: Response) => response.json())
    .catch((err) => {
      return err;
    });
  if (data.success) {
    authToken = data.authToken;
    return Promise.resolve({
      apiKey,
      app,
      version,
      domain,
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

/**
 * Sends log request to server.
 * You dont need to send authToken manually.
 *
 * @example
 * ```javascript
 * log("Hello World", "info");
 * ```
 *
 * @param logMsg: any
 * @param logTag?: string
 *
 * @returns {Promise<initSuccessReturnTypes | initErrorReturnTypes>}
 *
 * @public
 */
export function log(
  logMsg: any,
  logTag?: string
): Promise<logSuccessReturnTypes | logErrorReturnTypes>;

export function log(
  logMsg: any,
  logTag?: string
): Promise<logSuccessReturnTypes | logErrorReturnTypes> {
  return internalLog(logMsg, logTag, authToken);
}
