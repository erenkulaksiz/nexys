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
import { Core } from "src/classes/core/index.js";
import type { collectDataTypes } from "src/types.js";
export declare function collectNextJSData(): {
    buildId: any;
    nextExport: any;
    page: any;
    query: any;
    ver: any;
} | null;
export declare function collectVercelEnv(): {
    env: string;
    url: string | undefined;
    git: string | undefined;
    gitCommitSha: string | undefined;
    gitProvider: string | undefined;
    gitRepoId: string | undefined;
    gitRepoOwner: string | undefined;
    gitRepoSlug: string | undefined;
    gitCommitMessage: string | undefined;
    gitCommitAuthorName: string | undefined;
    gitCommitAuthorLogin: string | undefined;
    gitPullRequestId: string | undefined;
} | null;
export declare function collectDOMData(): {
    el: number;
} | null;
export declare function collectData(core: Core): Promise<collectDataTypes>;
//# sourceMappingURL=collect.d.ts.map