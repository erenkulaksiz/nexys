import { internalDataTypes } from "./init.types";
import type {
  logTypes,
  logSuccessReturnTypes,
  logErrorReturnTypes,
} from "./log.types";
import { addToLogPool } from "./logpool";

interface extendedLogTypes extends logTypes {
  internalData: internalDataTypes;
}

export async function log({
  logMsg,
  logTag,
  logType,
  internalData,
}: extendedLogTypes): Promise<logSuccessReturnTypes | logErrorReturnTypes> {
  return addToLogPool({ logMsg, logTag, internalData, logType });
}
