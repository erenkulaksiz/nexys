import fetch, { Response } from "node-fetch";
import { server } from "./utils";
const mqtt = require("mqtt");

export async function init() {
  const data = await fetch(`${server}/ping`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response: Response) => response.json())
    .catch((err) => {
      return err;
    });
  console.log(data);
}
