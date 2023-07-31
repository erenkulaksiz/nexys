/**
 * @license
 * Copyright 2023 Eren Kulaksiz
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { isClient } from "./isClient.js";
import { libraryName, version } from "./index.js";
export function collectNextJSData() {
    if (isClient()) {
        /* @ts-ignore next-line */
        var __NEXT_DATA__ = window.__NEXT_DATA__, next = window.next;
        if (__NEXT_DATA__) {
            var buildId = __NEXT_DATA__.buildId, nextExport = __NEXT_DATA__.nextExport, page = __NEXT_DATA__.page, query = __NEXT_DATA__.query;
            return {
                buildId: buildId,
                nextExport: nextExport,
                page: page,
                query: query,
                ver: next === null || next === void 0 ? void 0 : next.version,
            };
        }
        return null;
    }
    return null;
}
export function collectVercelEnv() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    if (isClient()) {
        /* @ts-ignore next-line */
        if (typeof process == "undefined")
            return null;
        if ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NEXT_PUBLIC_VERCEL_ENV) {
            return {
                env: (_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.NEXT_PUBLIC_VERCEL_ENV,
                url: (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.NEXT_PUBLIC_VERCEL_URL,
                git: (_d = process === null || process === void 0 ? void 0 : process.env) === null || _d === void 0 ? void 0 : _d.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
                gitCommitSha: (_e = process === null || process === void 0 ? void 0 : process.env) === null || _e === void 0 ? void 0 : _e.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
                gitProvider: (_f = process === null || process === void 0 ? void 0 : process.env) === null || _f === void 0 ? void 0 : _f.NEXT_PUBLIC_VERCEL_GIT_PROVIDER,
                gitRepoId: (_g = process === null || process === void 0 ? void 0 : process.env) === null || _g === void 0 ? void 0 : _g.NEXT_PUBLIC_VERCEL_GIT_REPO_ID,
                gitRepoOwner: (_h = process === null || process === void 0 ? void 0 : process.env) === null || _h === void 0 ? void 0 : _h.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER,
                gitRepoSlug: (_j = process === null || process === void 0 ? void 0 : process.env) === null || _j === void 0 ? void 0 : _j.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG,
                gitCommitMessage: (_k = process === null || process === void 0 ? void 0 : process.env) === null || _k === void 0 ? void 0 : _k.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE,
                gitCommitAuthorName: (_l = process === null || process === void 0 ? void 0 : process.env) === null || _l === void 0 ? void 0 : _l.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME,
                gitCommitAuthorLogin: (_m = process === null || process === void 0 ? void 0 : process.env) === null || _m === void 0 ? void 0 : _m.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN,
                gitPullRequestId: (_o = process === null || process === void 0 ? void 0 : process.env) === null || _o === void 0 ? void 0 : _o.NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID,
            };
        }
        return null;
    }
    return null;
}
export function collectDOMData() {
    if (isClient()) {
        var root = document.getElementsByTagName("body")[0];
        var allElements = root === null || root === void 0 ? void 0 : root.querySelectorAll("*").length;
        return {
            el: allElements,
        };
    }
    return null;
}
export function collectData(core) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var config, deviceData, CollectData, nextJSData, vercelEnv, DOMData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = core._config;
                    deviceData = "disabled";
                    if (!core._allowDeviceData) return [3 /*break*/, 2];
                    return [4 /*yield*/, core.Device.getDeviceData().catch(function (err) { return null; })];
                case 1:
                    deviceData =
                        (_a = (_b.sent())) !== null && _a !== void 0 ? _a : "client-disabled";
                    return [3 /*break*/, 3];
                case 2:
                    deviceData = "disabled";
                    _b.label = 3;
                case 3:
                    CollectData = {
                        deviceData: deviceData,
                        package: {
                            libraryName: libraryName,
                            version: version,
                        },
                        options: __assign(__assign({}, core._options), { logPoolSize: core._logPoolSize, allowDeviceData: core._allowDeviceData, sendAllOnType: core._sendAllOnType, ignoreType: core._ignoreType, ignoreTypeSize: core._ignoreTypeSize }),
                        env: {
                            type: core._env,
                            isClient: core._isClient,
                        },
                    };
                    if (config) {
                        CollectData = __assign(__assign({}, CollectData), { config: config });
                    }
                    nextJSData = collectNextJSData();
                    if (nextJSData) {
                        CollectData = __assign(__assign({}, CollectData), { env: __assign(__assign({}, CollectData.env), nextJSData) });
                    }
                    vercelEnv = collectVercelEnv();
                    if (vercelEnv) {
                        CollectData = __assign(__assign({}, CollectData), { env: __assign(__assign({}, CollectData.env), vercelEnv) });
                    }
                    if (core._isClient) {
                        if (document && "getElementById" in document && core._allowElementData) {
                            DOMData = collectDOMData();
                            if (DOMData) {
                                CollectData = __assign(__assign({}, CollectData), { env: __assign(__assign({}, CollectData.env), DOMData) });
                            }
                        }
                    }
                    return [2 /*return*/, CollectData];
            }
        });
    });
}
