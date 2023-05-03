import type { logTypes, requestTypes } from "../../types";
export interface EventTypes {
    error: ((event: ErrorEvent) => void) | null;
    unhandledRejection: ((event: PromiseRejectionEvent) => void) | null;
    logAdd: (({ data, options, ts }: logTypes) => void) | null;
    logsClear: (() => void) | null;
    requestsClear: (() => void) | null;
    coreInit: (() => void) | null;
    process: (() => void) | null;
    request: {
        sending: ((data?: any) => void) | null;
        success: (({ res, json }: {
            res?: Response;
            json: any;
        }) => void) | null;
        error: ((error: Error) => void) | null;
    };
    localStorageInit: ((localItem: any) => void) | null;
    requestAdd: (({ res, status, ts }: requestTypes) => void) | null;
}
//# sourceMappingURL=types.d.ts.map