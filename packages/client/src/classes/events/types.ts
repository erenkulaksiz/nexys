import type { logTypes, requestTypes } from "../../types";

export interface EventTypes {
  error: ((event: ErrorEvent) => void) | null;
  logAdd: (({ data, options, ts }: logTypes) => void) | null;
  logsClear: (() => void) | null;
  requestsClear: (() => void) | null;
  coreInit: (() => void) | null;
  request: {
    sending: ((data?: any) => void) | null; // data: any
    success: (({ res, json }: { res?: Response; json: any }) => void) | null;
    error: ((error: Error) => void) | null;
  };
  localStorageInit: ((localItem: any) => void) | null;
  requestAdd: (({ res, status, ts }: requestTypes) => void) | null;
}
