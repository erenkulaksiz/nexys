import { isClient } from "./isClient.js";

export function collectNextJSData(allowElementCount: boolean = true) {
  if (isClient()) {
    /* @ts-ignore next-line */
    const { __NEXT_DATA__, next } = window;
    if (__NEXT_DATA__) {
      const { buildId, nextExport, page, query } = __NEXT_DATA__;

      if (document && "getElementById" in document && allowElementCount) {
        const root = document.getElementById("__next");
        const allElements = root?.querySelectorAll("*").length;

        return {
          buildId,
          nextExport,
          page,
          query,
          ver: next?.version,
          el: allElements,
        };
      } else {
        return {
          buildId,
          nextExport,
          page,
          query,
          ver: next?.version,
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
        gitCommitAuthorName:
          process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME,
        gitCommitAuthorLogin:
          process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN,
        gitPullRequestId: process.env.NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID,
      };
    }
    return null;
  }
  return null;
}
