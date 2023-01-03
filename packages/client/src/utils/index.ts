import Package from "../../package.json";

export const server =
  process.env.NODE_ENV === "production"
    ? "https://api.nexys.app"
    : "http://localhost";
export const version = Package.version;
export { request } from "./request";
