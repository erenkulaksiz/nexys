import type { initSuccessReturnTypes, initErrorReturnTypes, initParams } from "./init.types";
import { logSuccessReturnTypes, logErrorReturnTypes } from "./log.types";
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
export declare function init({ apiKey, app, version, domain, }: initParams): Promise<initSuccessReturnTypes | initErrorReturnTypes>;
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
export declare function log(logMsg: any, logTag?: string): Promise<logSuccessReturnTypes | logErrorReturnTypes>;
//# sourceMappingURL=init.d.ts.map