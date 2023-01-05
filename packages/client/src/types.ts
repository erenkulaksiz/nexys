export interface initOptions {
  appName?: string;
  debug?: boolean;
  logPoolSize?: number;
  sendAllLogsOnType?: null | logOptionTypes | logOptionTypes[];
  server?: string;
  storeInLocalStorage?: boolean;
  useLocalStorageKey?: string;
  useLocalStorageTestKey?: string;
  useCryptionOnLocalStorage?: boolean;
  __EXTREMELY_SECRET_DO_NOT_USE_PLEASE?: boolean;
}

export type logOptionTypes = "DEBUG" | "INFO" | "WARNING" | "ERROR" | "FATAL";
export type logOptionLevels = "LOW" | "MEDIUM" | "HIGH";

export interface logOptions {
  type?: logOptionTypes; // Log type
  level?: logOptionLevels; // Log level
  tags?: string[];
}

export type logReturnType = "SUCCESS:LOGPOOLSIZE" | "ERROR";

export interface localStorageType {
  data: {
    data: any;
    options?: logOptions;
  }[];
  lastUpdated: number;
}
