import { init, log } from "./init";

import type {
  initSuccessReturnTypes,
  initErrorReturnTypes,
  initParams,
} from "./init.types";
import type { logSuccessReturnTypes, logErrorReturnTypes } from "./log.types";

// export individual functions
export * from "./init";
export * from "./init.types";

// export all functions
let superlog = {
  init,
  log,
} as {
  init: (
    params: initParams
  ) => Promise<initSuccessReturnTypes | initErrorReturnTypes>;
  log: (
    logMsg: any,
    logTag?: string,
    token?: string
  ) => Promise<logSuccessReturnTypes | logErrorReturnTypes>;
};

export default superlog;
