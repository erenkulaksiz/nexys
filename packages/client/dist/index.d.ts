import type { initSuccessReturnTypes, initErrorReturnTypes, initParams } from "./init.types";
import type { logSuccessReturnTypes, logErrorReturnTypes } from "./log.types";
export * from "./init";
export * from "./init.types";
declare let nexys: {
    init: (params: initParams) => Promise<initSuccessReturnTypes | initErrorReturnTypes>;
    log: (logMsg: any, logTag?: string, token?: string) => Promise<logSuccessReturnTypes | logErrorReturnTypes>;
};
export default nexys;
//# sourceMappingURL=index.d.ts.map