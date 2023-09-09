/**
 * @license
 * Copyright 2023 Eren Kulaksiz
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Core } from "../core/index.js";
import { guid } from "../../utils/index.js";
import type { APIConstructorParams, sendRequestParams } from "./types";

export class API {
  private core: Core;
  private _server: string = "";
  private _apiKey: string = "";
  private _appName: string = "";
  public _sendingRequest: boolean = false;

  constructor(core: Core, { server, apiKey, appName }: APIConstructorParams) {
    this.core = core;
    this._server = server;
    this._apiKey = apiKey;
    this._appName = appName;
  }

  public async sendRequest({
    headers,
    data,
  }: sendRequestParams): Promise<Response | any> {
    if (!this.checkAvailability())
      throw new Error("fetch is not defined (node environment)");
    if (this._sendingRequest) {
      throw new Error("API:ALREADY_SENDING");
    }
    this._sendingRequest = true;
    this.core.Events.fire("request.sending", data);

    const server = `${this._server}/api/report/${this._apiKey}/${this._appName}`;

    this.core.InternalLogger.log("API: Sending request to server", server);

    return fetch(server, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    }).then(async (res: Response) => {
      let json = null;

      try {
        json = await res.json();
      } catch (err) {
        json = null;
        throw new Error(`API:FAILED:JSON_PARSE_ERROR`);
      }

      if (res?.ok) {
        this.requestCompleted();
        this.core.Events.fire("request.success", { res, json });
        return {
          res,
          json,
        };
      }

      throw new Error(`API:FAILED:${res.status}:${json?.error}`);
    });
  }

  public async sendData(data: any): Promise<boolean> {
    return this.sendRequest({
      data,
    })
      .then(async (res) => {
        const data = res.json.data;
        await this.core.LocalStorage.setAPIValues(data);
        this.core._APIValues = data;
        this.core.InternalLogger.log("API: Successful request", res);
        this.core.Events.fire("request.add", { res, json: res.json });
        await this.core.LogPool.clearRequests();
        await this.core.LogPool.clearLogs();
        return true;
      })
      .catch(async (err) => {
        this.core.InternalLogger.error("API: Request failed.", err);
        this.core.Events.fire("request.error", err);
        if (err?.message == "API:FAILED:400:api-key") {
          this.core.InternalLogger.error(
            "API: Your API key is not valid. Please make sure you entered correct credentials."
          );
        }
        if (err?.message != "API:ALREADY_SENDING") {
          this.core.API.requestCompleted();
          await this.core.LogPool.pushRequest({
            res: {
              message: err.message,
              stack: err.stack,
            },
            status: "failed",
            ts: new Date().getTime(),
            guid: guid(),
          });
        }
        return false;
      });
  }

  public requestCompleted(): void {
    this._sendingRequest = false;
  }

  private checkAvailability() {
    return typeof fetch !== "undefined";
  }
}
