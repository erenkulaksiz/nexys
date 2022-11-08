import { init, log, error } from "./init";

import type {
  initParams,
  initReturnTypes,
  initSettingsTypes,
} from "./init.types";
import type { logSuccessReturnTypes, logErrorReturnTypes } from "./log.types";

// export individual functions
export * from "./init";
export * from "./init.types";

// export all functions
let nexys = {
  init,
  log,
  error,
} as {
  init: (
    params: initParams,
    settings?: initSettingsTypes
  ) => Promise<initReturnTypes>;
  log: (
    logMsg: any,
    logTag?: string
  ) => Promise<logSuccessReturnTypes | logErrorReturnTypes>;
  error: (
    logMsg: any,
    logTag?: string
  ) => Promise<logSuccessReturnTypes | logErrorReturnTypes>;
};

export default nexys;
