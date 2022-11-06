var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
import { server } from "./utils";
export function init({ apiKey, app, version, domain, }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(`${server}/auth`, {
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
            .then((response) => response.json())
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
            status: (_a = data.status) !== null && _a !== void 0 ? _a : 500,
            message: data.message,
        });
    });
}
