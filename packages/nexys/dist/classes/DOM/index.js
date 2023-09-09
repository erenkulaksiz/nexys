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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var DOM = /** @class */ (function () {
    function DOM(core) {
        this._rootVnode = null;
        this._isAvailable = false;
        this.zort = {
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
        };
        this.core = core;
        this.core.Events.fire("dom.init");
        this.core.InternalLogger.log("DOM: class initialized");
        this._isAvailable = this.isAvailable();
    }
    DOM.prototype.isAvailable = function () {
        if (this.core._isClient) {
            return true;
        }
        return typeof document !== "undefined";
    };
    DOM.prototype.VNODE = function (_a) {
        var _b = _a.vnode, type = _b.type, props = _b.props, value = _b.value, onClick = _b.onClick, children = _b.children, childrenCount = _a.childrenCount;
        var _childrenCount = childrenCount || 0;
        var vnode = { type: type };
        if (props) {
            vnode = __assign(__assign({}, vnode), { props: props });
        }
        if (value) {
            vnode = __assign(__assign({}, vnode), { value: value });
        }
        if (onClick) {
            vnode = __assign(__assign({}, vnode), { onClick: onClick });
        }
        if (typeof children != "undefined") {
            vnode = __assign({}, vnode);
        }
        return { vnode: vnode, childrenCount: _childrenCount };
    };
    DOM.prototype.getElement = function (selector) {
        if (this._isAvailable)
            return document.querySelector(selector);
        return null;
    };
    DOM.prototype.getElements = function (selector) {
        if (this._isAvailable)
            return Array.from(document.querySelectorAll(selector));
        return null;
    };
    DOM.prototype.loadVNODEfromJSON = function () {
        this._rootVnode = this.VNODE(this.zort);
        this.core.InternalLogger.log("DOM: VNODE loaded from JSON", this._rootVnode);
    };
    DOM.prototype.renderVNODE = function (selector, vnode) {
        this.core.InternalLogger.log("DOM: Render", vnode);
        var el = this.getElement(selector);
        if (!el) {
            this.core.InternalLogger.error("DOM: Element ".concat(selector, " not found"));
            return;
        }
    };
    return DOM;
}());
export { DOM };
