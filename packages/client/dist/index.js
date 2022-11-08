import { init, log, error } from "./init";
// export individual functions
export * from "./init";
export * from "./init.types";
// export all functions
let nexys = {
    init,
    log,
    error,
};
export default nexys;
