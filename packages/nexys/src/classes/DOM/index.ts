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

import type { Core } from "../core/index.js";
import type { VNODE } from "./types.js";

export class DOM {
  private core: Core;
  private _rootVnode: VNODE | null = null;
  private _isAvailable: boolean = false;

  private zort = {
    vnode: {
      type: "div",
      props: {
        id: "root",
        style: {
          "background-color": "blue",
        },
      },
      children: {
        vnode: {
          type: "div",
          props: { id: "child" },
        },
      },
    },
  } as VNODE;

  constructor(core: Core) {
    this.core = core;
    this.core.Events.fire("dom.init");
    this.core.InternalLogger.log("DOM: class initialized");
    this._isAvailable = this.isAvailable();
  }

  public isAvailable(): boolean {
    if (this.core._isClient) {
      return true;
    }
    return typeof document !== "undefined";
  }

  public VNODE({
    vnode: { type, props, value, onClick, children },
    childrenCount,
  }: VNODE): VNODE {
    let _childrenCount = childrenCount || 0;
    let vnode = { type } as VNODE["vnode"];

    if (props) {
      vnode = { ...vnode, props };
    }

    if (value) {
      vnode = { ...vnode, value };
    }

    if (onClick) {
      vnode = {
        ...vnode,
        onClick,
      };
    }

    if (typeof children != "undefined") {
      vnode = {
        ...vnode,
        //children: this.VNODE({ vnode: children as VNODE }),
      };
    }

    return { vnode, childrenCount: _childrenCount };
  }

  public getElement(selector: string): HTMLElement | null {
    if (this._isAvailable) return document.querySelector(selector);
    return null;
  }

  public getElements(selector: string): HTMLElement[] | null {
    if (this._isAvailable)
      return Array.from(document.querySelectorAll(selector));
    return null;
  }

  public loadVNODEfromJSON() {
    this._rootVnode = this.VNODE(this.zort);

    this.core.InternalLogger.log(
      "DOM: VNODE loaded from JSON",
      this._rootVnode
    );
  }

  public renderVNODE(selector: string, vnode: VNODE) {
    this.core.InternalLogger.log("DOM: Render", vnode);
    const el = this.getElement(selector);
    if (!el) {
      this.core.InternalLogger.error(`DOM: Element ${selector} not found`);
      return;
    }
  }
}
