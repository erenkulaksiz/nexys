import type { initParams, initReturnTypes, initSettingsTypes } from "./init.types";
import type { logSuccessReturnTypes, logErrorReturnTypes } from "./log.types";
export * from "./init";
export * from "./init.types";
declare let nexys: {
    init: (params: initParams, settings?: initSettingsTypes) => Promise<initReturnTypes>;
    log: (logMsg: any, logTag?: string) => Promise<logSuccessReturnTypes | logErrorReturnTypes>;
    error: (logMsg: any, logTag?: string) => Promise<logSuccessReturnTypes | logErrorReturnTypes>;
};
export default nexys;
//# sourceMappingURL=index.d.ts.map