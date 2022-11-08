import { log as internalLog } from "./log";
import type { logSuccessReturnTypes, logErrorReturnTypes } from "./log.types";
import type {
  initReturnTypes,
  initParams,
  initSettingsTypes,
  internalDataTypes,
} from "./init.types";

let _internalData = {
  apiKey: "",
} as internalDataTypes;

const initSettingsDefaults: initSettingsTypes = {
  logTreshold: 0,
  logToConsole: true,
};

/**
 * Creates and initializes a Nexys instance.
 *
 * @example
 * ```javascript
 * init({
 *   apiKey: "YOUR-AUTH-TOKEN",
 *   app: "nexys",
 *   version: "1.0.0",
 *   domain: "https://nexys.app",
 * });
 * ```
 *
 * @param apiKey: string
 * @param app: string
 * @param version: string
 * @param domain: string
 * @returns {Promise<initReturnTypes>}
 *
 * @public
 */
export async function init(
  { apiKey, app, version, domain }: initParams,
  settings: initSettingsTypes = initSettingsDefaults
): Promise<initReturnTypes> {
  _internalData.apiKey = apiKey;
  _internalData.app = app;
  _internalData.version = version;
  _internalData.domain = domain;
  _internalData.settings = settings;

  return Promise.resolve({
    apiKey,
    app,
    version,
    domain,
    settings,
  });
}

/**
 * Sends log request to server.
 * You don't need to send authToken manually.
 *
 * @example
 * ```javascript
 * log("Hello World", "info");
 * ```
 *
 * @param logMsg: any
 * @param logTag?: string
 *
 * @returns {Promise<logSuccessReturnTypes | logErrorReturnTypes>}
 *
 * @public
 */
export function log(
  logMsg: any,
  logTag?: string
): Promise<logSuccessReturnTypes | logErrorReturnTypes> {
  return internalLog({
    logMsg,
    logTag,
    logType: "log",
    internalData: _internalData,
  });
}

export function error(
  logMsg: any,
  logTag?: string
): Promise<logSuccessReturnTypes | logErrorReturnTypes> {
  return internalLog({
    logMsg,
    logTag,
    logType: "error",
    internalData: _internalData,
  });
}
