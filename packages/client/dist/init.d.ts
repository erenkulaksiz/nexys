import type { initSuccessReturnTypes, initErrorReturnTypes, initParams } from "./init.types";
import { logSuccessReturnTypes, logErrorReturnTypes } from "./log.types";
/**
 * Creates and initializes a Nexys instance.
 *
 * @example
 * ```javascript
 * init({
 *   apiKey: "AIzaSyDQWc6JY6KzV1r6g8g",
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
 * @returns {Promise<initSuccessReturnTypes | initErrorReturnTypes>}
 *
 * @public
 */
export declare function init({ apiKey, app, version, domain, }: initParams): Promise<initSuccessReturnTypes | initErrorReturnTypes>;
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
 * @returns {Promise<initSuccessReturnTypes | initErrorReturnTypes>}
 *
 * @public
 */
export declare function log(logMsg: any, logTag?: string): Promise<logSuccessReturnTypes | logErrorReturnTypes>;
//# sourceMappingURL=init.d.ts.map