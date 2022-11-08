import type { logSuccessReturnTypes, logErrorReturnTypes } from "./log.types";
import type { initReturnTypes, initParams, initSettingsTypes } from "./init.types";
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
export declare function init({ apiKey, app, version, domain }: initParams, settings?: initSettingsTypes): Promise<initReturnTypes>;
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
export declare function log(logMsg: any, logTag?: string): Promise<logSuccessReturnTypes | logErrorReturnTypes>;
export declare function error(logMsg: any, logTag?: string): Promise<logSuccessReturnTypes | logErrorReturnTypes>;
//# sourceMappingURL=init.d.ts.map