import { init, log } from "./init";
// export individual functions
export * from "./init";
export * from "./init.types";
// export all functions
let nexys = {
    init,
    log,
};
export default nexys;
