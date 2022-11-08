import { internalDataTypes } from "./init.types";
import type { logTypes } from "./log.types";
interface addToLogPoolParams extends logTypes {
    internalData: internalDataTypes;
}
export declare function addToLogPool({ logMsg, logTag, logType, internalData, }: addToLogPoolParams): Promise<any>;
export declare function processLogPool(): Promise<any>;
export {};
//# sourceMappingURL=logpool.d.ts.map