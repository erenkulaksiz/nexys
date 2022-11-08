var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { log as internalLog } from "./log";
let _internalData = {
    apiKey: "",
};
const initSettingsDefaults = {
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
export function init({ apiKey, app, version, domain }, settings = initSettingsDefaults) {
    return __awaiter(this, void 0, void 0, function* () {
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
export function log(logMsg, logTag) {
    return internalLog({
        logMsg,
        logTag,
        logType: "log",
        internalData: _internalData,
    });
}
export function error(logMsg, logTag) {
    return internalLog({
        logMsg,
        logTag,
        logType: "error",
        internalData: _internalData,
    });
}
