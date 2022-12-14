import Package from "@/package.json";
export var server = process.env.NODE_ENV === "production"
    ? "https://api.nexys.app"
    : "http://localhost:80";
export var version = Package.version;
export { request } from "./request";
