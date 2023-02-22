export declare function collectNextJSData(allowElementCount?: boolean): {
    buildId: any;
    nextExport: any;
    page: any;
    query: any;
    ver: any;
    el: number | undefined;
} | {
    buildId: any;
    nextExport: any;
    page: any;
    query: any;
    ver: any;
    el?: undefined;
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
//# sourceMappingURL=collect.d.ts.map