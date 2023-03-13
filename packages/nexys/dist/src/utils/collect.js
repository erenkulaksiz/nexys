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
    if (isClient()) {
        /* @ts-ignore next-line */
        if (process.env.NEXT_PUBLIC_VERCEL_ENV) {
            return {
                env: process.env.NEXT_PUBLIC_VERCEL_ENV,
                url: process.env.NEXT_PUBLIC_VERCEL_URL,
                git: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
                gitCommitSha: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
                gitProvider: process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER,
                gitRepoId: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_ID,
                gitRepoOwner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER,
                gitRepoSlug: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG,
                gitCommitMessage: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE,
                gitCommitAuthorName: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME,
                gitCommitAuthorLogin: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN,
                gitPullRequestId: process.env.NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID,
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
