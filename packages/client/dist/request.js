import fetch from "node-fetch";
import { server } from "./utils";
export function request({ url, method, body, headers, }) {
    return fetch(`${server}/${url}`, {
        method,
        headers: Object.assign({ "Content-Type": "application/json" }, headers),
        body: JSON.stringify(body),
    }).catch((err) => {
        return err;
    });
}
