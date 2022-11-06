import type { initSuccessReturnTypes, initErrorReturnTypes, initParams } from "./init.types";
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
export declare function init({ apiKey, app, version, domain, }: initParams): Promise<initSuccessReturnTypes | initErrorReturnTypes>;
//# sourceMappingURL=init.d.ts.map