import { logTypes } from "./log.types";

export interface initSettingsTypes {
  logToConsole?: boolean;
  logTreshold?: number | logTypes["logType"]; // min number of logs to send all logs to the server
}

export interface initParams {
  apiKey: string;
  app: string;
  version: string;
  domain: string;
}

export interface initReturnTypes extends initParams {}

export interface initErrorReturnTypes {
  success?: boolean;
  status?: number;
  message?: string;
}

export interface internalDataTypes extends initParams {
  apiKey: string;
  settings: initSettingsTypes;
}
