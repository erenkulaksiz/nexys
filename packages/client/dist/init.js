var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { request } from "./request";
import { log as internalLog } from "./log";
let authToken = "";
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
export function init({ apiKey, app, version, domain, }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (apiKey.length != 16)
            return Promise.reject({
                success: false,
                status: 401,
                message: "auth/invalid-api-key",
            });
        // Once token is recieved, we will not going to store it in localstorage.
        // We will store it in memory and use it for all the subsequent requests.
        const data = yield request({
            url: "auth",
            method: "POST",
            body: { apiKey, app, version, domain },
        })
            .then((response) => response.json())
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
            status: (_a = data.status) !== null && _a !== void 0 ? _a : 500,
            message: data.message,
        });
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
 * @returns {Promise<initSuccessReturnTypes | initErrorReturnTypes>}
 *
 * @public
 */
export function log(logMsg, logTag) {
    return internalLog(logMsg, logTag, authToken);
}
