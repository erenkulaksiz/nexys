var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import fetch from "node-fetch";
import { server } from "@utils";
export function request(_a) {
    var url = _a.url, method = _a.method, body = _a.body, headers = _a.headers;
    return fetch("".concat(server, "/").concat(url), {
        method: method,
        headers: __assign({ "Content-Type": "application/json" }, headers),
        body: JSON.stringify(body),
    }).catch(function (err) {
        return err;
    });
}
