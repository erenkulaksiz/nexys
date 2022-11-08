import { internalDataTypes } from "./init.types";
import type { logTypes, logSuccessReturnTypes, logErrorReturnTypes } from "./log.types";
interface extendedLogTypes extends logTypes {
    internalData: internalDataTypes;
}
export declare function log({ logMsg, logTag, logType, internalData, }: extendedLogTypes): Promise<logSuccessReturnTypes | logErrorReturnTypes>;
export {};
//# sourceMappingURL=log.d.ts.map