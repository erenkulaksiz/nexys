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
import { isClient } from "./isClient.js";
export function collectNextJSData(allowElementCount) {
    if (allowElementCount === void 0) { allowElementCount = true; }
    if (isClient()) {
        /* @ts-ignore next-line */
        var __NEXT_DATA__ = window.__NEXT_DATA__, next = window.next;
        if (__NEXT_DATA__) {
            var buildId = __NEXT_DATA__.buildId, nextExport = __NEXT_DATA__.nextExport, page = __NEXT_DATA__.page, query = __NEXT_DATA__.query;
            if (document && "getElementById" in document && allowElementCount) {
                return {
                    buildId: buildId,
                    nextExport: nextExport,
                    page: page,
                    query: query,
                    ver: next === null || next === void 0 ? void 0 : next.version,
                };
            }
            else {
                return {
                    buildId: buildId,
                    nextExport: nextExport,
                    page: page,
                    query: query,
                    ver: next === null || next === void 0 ? void 0 : next.version,
                };
            }
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
