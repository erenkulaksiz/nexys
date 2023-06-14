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

export function collectNextJSData(allowElementCount: boolean = true) {
  if (isClient()) {
    /* @ts-ignore next-line */
    const { __NEXT_DATA__, next } = window;
    if (__NEXT_DATA__) {
      const { buildId, nextExport, page, query } = __NEXT_DATA__;
      if (document && "getElementById" in document && allowElementCount) {
        return {
          buildId,
          nextExport,
          page,
          query,
          ver: next?.version,
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
    if (typeof process == "undefined") return null;
    if (process?.env?.NEXT_PUBLIC_VERCEL_ENV) {
      return {
        env: process?.env?.NEXT_PUBLIC_VERCEL_ENV,
        url: process?.env?.NEXT_PUBLIC_VERCEL_URL,
        git: process?.env?.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
        gitCommitSha: process?.env?.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
        gitProvider: process?.env?.NEXT_PUBLIC_VERCEL_GIT_PROVIDER,
        gitRepoId: process?.env?.NEXT_PUBLIC_VERCEL_GIT_REPO_ID,
        gitRepoOwner: process?.env?.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER,
        gitRepoSlug: process?.env?.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG,
        gitCommitMessage: process?.env?.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE,
        gitCommitAuthorName:
          process?.env?.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME,
        gitCommitAuthorLogin:
          process?.env?.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN,
        gitPullRequestId: process?.env?.NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID,
      };
    }
    return null;
  }
  return null;
}

export function collectDOMData() {
  if (isClient()) {
    const root = document.getElementsByTagName("body")[0];
    const allElements = root?.querySelectorAll("*").length;

    return {
      el: allElements,
    };
  }
  return null;
}
