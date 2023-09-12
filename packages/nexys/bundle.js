(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.nexys = factory());
})(this, (function () { 'use strict';

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
    /**
     * Helper functions to encode/decode localStorage logs into Base64.
     */
    var Base64 = {
        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        // public method for encoding
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = Base64._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output =
                    output +
                        Base64._keyStr.charAt(enc1) +
                        Base64._keyStr.charAt(enc2) +
                        Base64._keyStr.charAt(enc3) +
                        Base64._keyStr.charAt(enc4);
            }
            return output;
        },
        // public method for decoding
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = Base64._keyStr.indexOf(input.charAt(i++));
                enc2 = Base64._keyStr.indexOf(input.charAt(i++));
                enc3 = Base64._keyStr.indexOf(input.charAt(i++));
                enc4 = Base64._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = Base64._utf8_decode(output);
            return output;
        },
        // private method for UTF-8 encoding
        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if (c > 127 && c < 2048) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        // private method for UTF-8 decoding
        _utf8_decode: function (utftext) {
            var string = "";
            var i = 0;
            var c2;
            var c3;
            var c = (c2 = 0);
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if (c > 191 && c < 224) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        },
    };

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
    function isClient() {
        return typeof window === "undefined" ? false : true;
    }

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
    function guid() {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }

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
    var __assign$7 = (undefined && undefined.__assign) || function () {
        __assign$7 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$7.apply(this, arguments);
    };
    var __awaiter$7 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$7 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    function collectNextJSData() {
        if (isClient()) {
            /* @ts-ignore next-line */
            var __NEXT_DATA__ = window.__NEXT_DATA__, next = window.next;
            if (__NEXT_DATA__) {
                var buildId = __NEXT_DATA__.buildId, nextExport = __NEXT_DATA__.nextExport, page = __NEXT_DATA__.page, query = __NEXT_DATA__.query;
                return {
                    buildId: buildId,
                    nextExport: nextExport,
                    page: page,
                    query: query,
                    ver: next === null || next === void 0 ? void 0 : next.version,
                };
            }
            return null;
        }
        return null;
    }
    function collectVercelEnv() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        if (isClient()) {
            /* @ts-ignore next-line */
            if (typeof process == "undefined")
                return null;
            if ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NEXT_PUBLIC_VERCEL_ENV) {
                return {
                    env: (_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.NEXT_PUBLIC_VERCEL_ENV,
                    url: (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.NEXT_PUBLIC_VERCEL_URL,
                    git: (_d = process === null || process === void 0 ? void 0 : process.env) === null || _d === void 0 ? void 0 : _d.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
                    gitCommitSha: (_e = process === null || process === void 0 ? void 0 : process.env) === null || _e === void 0 ? void 0 : _e.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
                    gitProvider: (_f = process === null || process === void 0 ? void 0 : process.env) === null || _f === void 0 ? void 0 : _f.NEXT_PUBLIC_VERCEL_GIT_PROVIDER,
                    gitRepoId: (_g = process === null || process === void 0 ? void 0 : process.env) === null || _g === void 0 ? void 0 : _g.NEXT_PUBLIC_VERCEL_GIT_REPO_ID,
                    gitRepoOwner: (_h = process === null || process === void 0 ? void 0 : process.env) === null || _h === void 0 ? void 0 : _h.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER,
                    gitRepoSlug: (_j = process === null || process === void 0 ? void 0 : process.env) === null || _j === void 0 ? void 0 : _j.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG,
                    gitCommitMessage: (_k = process === null || process === void 0 ? void 0 : process.env) === null || _k === void 0 ? void 0 : _k.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE,
                    gitCommitAuthorName: (_l = process === null || process === void 0 ? void 0 : process.env) === null || _l === void 0 ? void 0 : _l.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME,
                    gitCommitAuthorLogin: (_m = process === null || process === void 0 ? void 0 : process.env) === null || _m === void 0 ? void 0 : _m.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN,
                    gitPullRequestId: (_o = process === null || process === void 0 ? void 0 : process.env) === null || _o === void 0 ? void 0 : _o.NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID,
                };
            }
            return null;
        }
        return null;
    }
    function collectDOMData() {
        if (isClient()) {
            var root = document.getElementsByTagName("body")[0];
            var allElements = root === null || root === void 0 ? void 0 : root.querySelectorAll("*").length;
            return {
                el: allElements,
            };
        }
        return null;
    }
    function collectData(core) {
        var _a;
        return __awaiter$7(this, void 0, void 0, function () {
            var config, deviceData, CollectData, nextJSData, vercelEnv, DOMData;
            return __generator$7(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = core._config;
                        deviceData = "disabled";
                        if (!core._allowDeviceData) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.Device.getDeviceData().catch(function (err) { return null; })];
                    case 1:
                        deviceData =
                            (_a = (_b.sent())) !== null && _a !== void 0 ? _a : "client-disabled";
                        return [3 /*break*/, 3];
                    case 2:
                        deviceData = "disabled";
                        _b.label = 3;
                    case 3:
                        CollectData = {
                            deviceData: deviceData,
                            package: {
                                libraryName: libraryName,
                                version: version,
                            },
                            options: __assign$7(__assign$7({}, core._options), { logPoolSize: core._logPoolSize, allowDeviceData: core._allowDeviceData, sendAllOnType: core._sendAllOnType, ignoreType: core._ignoreType, ignoreTypeSize: core._ignoreTypeSize }),
                            env: {
                                type: core._env,
                                isClient: core._isClient,
                            },
                        };
                        if (config) {
                            CollectData = __assign$7(__assign$7({}, CollectData), { config: config });
                        }
                        nextJSData = collectNextJSData();
                        if (nextJSData) {
                            CollectData = __assign$7(__assign$7({}, CollectData), { env: __assign$7(__assign$7({}, CollectData.env), nextJSData) });
                        }
                        vercelEnv = collectVercelEnv();
                        if (vercelEnv) {
                            CollectData = __assign$7(__assign$7({}, CollectData), { env: __assign$7(__assign$7({}, CollectData.env), vercelEnv) });
                        }
                        if (core._isClient) {
                            if (document && "getElementById" in document && core._allowElementData) {
                                DOMData = collectDOMData();
                                if (DOMData) {
                                    CollectData = __assign$7(__assign$7({}, CollectData), { env: __assign$7(__assign$7({}, CollectData.env), DOMData) });
                                }
                            }
                        }
                        return [2 /*return*/, CollectData];
                }
            });
        });
    }

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
    var server = "https://dash.nexys.app";
    var libraryName = "Nexys";
    var version = "1.1.0";
    var defaultOptions = {
        localStorage: {
            useLocalStorage: true,
            useAdapter: false,
            cryption: true,
            key: "__nex__",
            testKey: "__nex-t__",
        },
        errors: {
            allowAutomaticHandling: true, // Used for automatic exception handling.
        },
    };

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
    function getPagePath(core) {
        if (core._isClient) {
            if (window === null || window === void 0 ? void 0 : window.location) {
                return window.location.pathname;
            }
            return null;
        }
        return null;
    }

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
    var __assign$6 = (undefined && undefined.__assign) || function () {
        __assign$6 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$6.apply(this, arguments);
    };
    var __awaiter$6 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$6 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var Core = /** @class */ (function () {
        function Core(API_KEY, options) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            this._initialized = false;
            this._processAvailable = typeof process != "undefined";
            this._version = version;
            this._server = server;
            this._logPoolSize = 10;
            this._options = defaultOptions;
            this._isClient = isClient();
            this._allowDeviceData = true;
            this._allowGeoLocation = false;
            this._allowElementData = true;
            this._env = this._processAvailable
                ? (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) !== null && _b !== void 0 ? _b : "production"
                : "production";
            this._sendAllOnType = [
                "ERROR",
                "AUTO:ERROR",
                "AUTO:UNHANDLEDREJECTION",
            ];
            this._ignoreType = "METRIC";
            this._ignoreTypeSize = 50;
            this._config = null;
            this._APIValues = null;
            this._useLocalStorageAdapter = false;
            this._options = __assign$6(__assign$6({}, options), { localStorage: __assign$6(__assign$6({}, this._options.localStorage), options === null || options === void 0 ? void 0 : options.localStorage), errors: __assign$6(__assign$6({}, this._options.errors), options === null || options === void 0 ? void 0 : options.errors) });
            this._apiKey = API_KEY;
            this._server = (_c = options === null || options === void 0 ? void 0 : options.server) !== null && _c !== void 0 ? _c : server;
            this._logPoolSize = (_d = options === null || options === void 0 ? void 0 : options.logPoolSize) !== null && _d !== void 0 ? _d : this._logPoolSize;
            this._allowDeviceData = (_e = options === null || options === void 0 ? void 0 : options.allowDeviceData) !== null && _e !== void 0 ? _e : this._allowDeviceData;
            this._allowGeoLocation =
                (_f = options === null || options === void 0 ? void 0 : options.allowGeoLocation) !== null && _f !== void 0 ? _f : this._allowGeoLocation;
            this._allowElementData = typeof (options === null || options === void 0 ? void 0 : options.allowElementData) == "undefined";
            this._sendAllOnType =
                typeof (options === null || options === void 0 ? void 0 : options.sendAllOnType) == "undefined"
                    ? this._sendAllOnType
                    : options === null || options === void 0 ? void 0 : options.sendAllOnType;
            this._ignoreType =
                typeof (options === null || options === void 0 ? void 0 : options.ignoreType) == "undefined"
                    ? this._ignoreType
                    : options === null || options === void 0 ? void 0 : options.ignoreType;
            this._ignoreTypeSize =
                typeof (options === null || options === void 0 ? void 0 : options.ignoreTypeSize) == "undefined"
                    ? this._ignoreTypeSize
                    : options === null || options === void 0 ? void 0 : options.ignoreTypeSize;
            this._useLocalStorageAdapter =
                typeof ((_g = options === null || options === void 0 ? void 0 : options.localStorage) === null || _g === void 0 ? void 0 : _g.useAdapter) == "undefined"
                    ? this._useLocalStorageAdapter
                    : (_h = options === null || options === void 0 ? void 0 : options.localStorage) === null || _h === void 0 ? void 0 : _h.useAdapter;
            if (!this._apiKey)
                throw new Error("NexysCore: API_KEY is not defined");
            if (!this._options.appName)
                throw new Error("NexysCore: Please specify appName in constructor options");
        }
        Core.prototype._checkInitialized = function () {
            if (!this._initialized) {
                console.error("📕 [NEXYS-ERROR]: ", "Nexys is not initialized. Please initialize Nexys before using it.");
                return false;
            }
            return true;
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/logging/log
         *
         * @description Adds log request to logPool in Nexys instance.
         *
         * @example
         * ```javascript
         * // Create a Nexys instance and log "Hello World"
         * const nexys = new Nexys("API_KEY", { appName: "My_app" });
         * nexys.init();
         * nexys.log("Hello World");
         * ```
         *
         * ```javascript
         * // Log "Hello World" with options
         * nexys.log("Hello World", { type: "info" });
         * ```
         *
         * @param data - Any data to be logged. See types https://github.com/erenkulaksiz/nexys/blob/master/packages/nexys/src/types.ts#L68
         * @param options - `Optional` - `object` - Log options specified below
         * @param options.type - `Optional` - `string` - Log type
         * @param options.level - `Optional` - `string` - Log level
         * @param options.tags - `Optional` - `string[]` - Log tags
         * @param options.action - `Optional` - `string` - Log action
         * @public
         * @returns {Promise<void>} - Returns nothing.
         *
         */
        Core.prototype.log = function (data, options) {
            return __awaiter$6(this, void 0, void 0, function () {
                var e;
                return __generator$6(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._checkInitialized()) {
                                return [2 /*return*/];
                            }
                            e = new Error();
                            return [4 /*yield*/, this.LogPool.push({
                                    data: data,
                                    options: options,
                                    stack: e.stack,
                                    ts: new Date().getTime(),
                                    guid: guid(),
                                    path: getPagePath(this),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/logging/error
         *
         * @description Adds error request to logPool in Nexys instance.
         *
         * @example
         * ```javascript
         * // Create a Nexys instance and log "Hello World"
         * const nexys = new Nexys("API_KEY", { appName: "My_app" });
         * nexys.init();
         * // Error log parameter expects an object
         * nexys.error({ message: "Hello World" });
         * ```
         *
         * @param data - Any data to be logged. See types https://github.com/erenkulaksiz/nexys/blob/master/packages/nexys/src/types.ts#L77
         * @param options - `Optional` - `object` - Log options specified below
         * @param options.type - `Optional` - `string` - Log type
         * @param options.level - `Optional` - `string` - Log level
         * @param options.tags - `Optional` - `string[]` - Log tags
         * @param options.action - `Optional` - `string` - Log action
         * @public
         * @returns {Promise<void>} - Returns nothing.
         *
         */
        Core.prototype.error = function (data, options) {
            return __awaiter$6(this, void 0, void 0, function () {
                var e;
                return __generator$6(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._checkInitialized()) {
                                return [2 /*return*/];
                            }
                            e = new Error();
                            return [4 /*yield*/, this.LogPool.push({
                                    data: data,
                                    options: __assign$6({ type: "ERROR" }, options),
                                    stack: e.stack,
                                    ts: new Date().getTime(),
                                    guid: guid(),
                                    path: getPagePath(this),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/metrics
         *
         * @description `NextJS only method`
         *  Collect metric data for NextJS for performance measuring
         *  The metric data will not affect logPoolSize on default, log types with "METRIC" is ignored by default.
         *  Data collected from metrics will be sent if any request to dashboard happens. We do not want to send metric data on each page load. This will cause your client to get rate limit blocked.
         *  We will add metric support for React soon.
         *
         * @example
         * ```javascript
         * // Create a Nexys instance and initialize it
         * const nexys = new Nexys("API_KEY", { appName: "My_app" });
         * nexys.init();
         * // inside pages/_app.jsx|tsx
         * export function reportWebVitals(metric: NextWebVitalsMetric) {
         *  nexys.metric(metric);
         * }
         * ```
         *
         * @param metric Metric data that you get from calling reportWebVitals in NextJS
         * @public
         * @returns {Promise<void>} - Returns nothing.
         *
         */
        Core.prototype.metric = function (metric) {
            return __awaiter$6(this, void 0, void 0, function () {
                var e;
                return __generator$6(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._checkInitialized()) {
                                return [2 /*return*/];
                            }
                            e = new Error();
                            return [4 /*yield*/, this.LogPool.push({
                                    data: metric,
                                    options: {
                                        type: "METRIC",
                                    },
                                    ts: new Date().getTime(),
                                    guid: guid(),
                                    stack: e.stack,
                                    path: getPagePath(this),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/category/user-configuration
         *
         * @description Configures Nexys instance. All logs sent to Nexys will use these configurations.
         * This method will help you trough identifying your logs where came from like which user or which device.
         *
         * @example
         * ```javascript
         * // Create a Nexys instance and initialize it
         * const nexys = new Nexys("API_KEY", { appName: "My_app" });
         * nexys.init();
         * // Import types of config (Optional: If TypeScript is being used)
         * import type { configFunctions } from "nexys/dist/src/types";
         * // Configure Nexys
         * nexys.configure((config: configFunctions) => {
         *  // Set user
         *  config.setUser("123456789_UNIQUE_ID");
         *  // Set application version (likely to be your app version)
         *  // This config is MUST-to-do because we will analyze each of your versions
         *  config.setAppVersion("1.0.0");
         * });
         * ```
         *
         * @param config - `Required` - `object` - Config functions
         * @param config.setUser - `Optional` - `function` - Set user
         * @param config.setAppVersion - `Optional` - `function` - Set application version
         * @public
         * @returns {void} - Returns nothing.
         *
         */
        Core.prototype.configure = function (config) {
            var _this = this;
            if (!this._checkInitialized()) {
                return;
            }
            (function () {
                return typeof config == "function" &&
                    config({
                        setUser: function (user) { return __awaiter$6(_this, void 0, void 0, function () {
                            return __generator$6(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this._config = __assign$6(__assign$6({}, this._config), { user: user });
                                        return [4 /*yield*/, this.LocalStorage.setUser(user)];
                                    case 1:
                                        _a.sent();
                                        this.InternalLogger.log("NexysCore: User configured", user);
                                        this.Events.fire("config.user", user);
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                        setAppVersion: function (appVersion) { return __awaiter$6(_this, void 0, void 0, function () {
                            return __generator$6(this, function (_a) {
                                this._config = __assign$6(__assign$6({}, this._config), { appVersion: appVersion });
                                this.InternalLogger.log("NexysCore: App version configured", appVersion);
                                this.Events.fire("config.app.version", appVersion);
                                return [2 /*return*/];
                            });
                        }); },
                    });
            })();
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/clear
         *
         * @description This method will clear whatever stored in Nexys.
         *
         * @example
         * ```javascript
         * nexys.clear();
         * ```
         *
         * @public
         * @returns {void} - Returns nothing.
         *
         */
        Core.prototype.clear = function () {
            return __awaiter$6(this, void 0, void 0, function () {
                return __generator$6(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._checkInitialized()) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.LogPool.clearLogs()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.LogPool.clearRequests()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/force-request
         *
         * @description This method will force a request to Nexys.
         * Use this method if you want to send all logs to Nexys immediately.
         * This method is not recommended to use. It will cause your client to get rate limit blocked if you use it too much.
         *
         * @example
         * ```javascript
         * nexys.forceRequest();
         * ```
         *
         * @async - This method is async.
         * @public
         * @returns {Promise<void>} - Returns nothing.
         *
         */
        Core.prototype.forceRequest = function () {
            return __awaiter$6(this, void 0, void 0, function () {
                return __generator$6(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._checkInitialized()) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.LogPool.sendAll()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/get-library-version
         *
         * @description This method will return Nexys library version in string.
         *
         * @example
         * ```javascript
         * nexys.getLibraryVersion();
         * ```
         *
         * @public
         * @returns {string} - Returns library version.
         *
         */
        Core.prototype.getLibraryVersion = function () {
            if (!this._checkInitialized()) {
                return null;
            }
            return this._version;
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/get-user
         *
         * @description This method will return configured user.
         * If user is not configured, it will return null.
         *
         * @example
         * ```javascript
         * nexys.getUser();
         * ```
         *
         * @public
         * @returns {string | null} - Returns user if configured, otherwise null.
         *
         */
        Core.prototype.getUser = function () {
            var _a, _b;
            if (!this._checkInitialized()) {
                return null;
            }
            return (_b = (_a = this._config) === null || _a === void 0 ? void 0 : _a.user) !== null && _b !== void 0 ? _b : null;
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/logpool/get-logpool-length
         *
         * @description This method will return log length in logPool.
         *
         * @example
         * ```javascript
         * nexys.getLogPoolLength();
         * ```
         *
         * @public
         * @returns {number} - Returns log length in logPool.
         *
         */
        Core.prototype.getLogPoolLength = function () {
            if (!this._checkInitialized()) {
                return 0;
            }
            return this.LogPool.logs.length;
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/logpool/get-logpool-log-types
         *
         * @description This method will return log types in logPool. Multiple same types will be counted as one. No-typed logs will not be counted.
         *
         * @example
         * ```javascript
         * nexys.getLogPoolLogTypes();
         * ```
         *
         * @public
         * @returns {string[]} - Returns log types in logPool.
         *
         */
        Core.prototype.getLogPoolLogTypes = function () {
            if (!this._checkInitialized()) {
                return null;
            }
            var items = {};
            this.LogPool.logs.forEach(function (log) {
                var _a, _b, _c, _d;
                if ((_a = log === null || log === void 0 ? void 0 : log.options) === null || _a === void 0 ? void 0 : _a.type) {
                    items[(_b = log === null || log === void 0 ? void 0 : log.options) === null || _b === void 0 ? void 0 : _b.type] = items[(_c = log === null || log === void 0 ? void 0 : log.options) === null || _c === void 0 ? void 0 : _c.type]
                        ? items[(_d = log === null || log === void 0 ? void 0 : log.options) === null || _d === void 0 ? void 0 : _d.type] + 1
                        : 1;
                }
            });
            return Object.keys(items);
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/logpool/get-logpool-logs
         *
         * @description This method will return logPool logs.
         *
         * @example
         * ```javascript
         * nexys.getLogPoolLogTypes();
         * ```
         *
         * @public
         * @returns {logTypes[]} - Returns logPool logs.
         */
        Core.prototype.getLogPoolLogs = function () {
            if (!this._checkInitialized()) {
                return null;
            }
            return this.LogPool.logs;
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/logpool/get-logpool-requests
         *
         * @description This method will return requests in logPool. Requests array will be cleared (also on localStorage) after each successful request to Nexys.
         *
         * @example
         * ```javascript
         * nexys.getLogPoolRequests();
         * ```
         *
         * @public
         * @returns {requestTypes[]} - Returns requests in logPool.
         *
         */
        Core.prototype.getLogPoolRequests = function () {
            if (!this._checkInitialized()) {
                return null;
            }
            return this.LogPool.requests;
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/get-api-values
         *
         * @description This method will return API values. API values might be null if there is no request to Nexys yet also if there is no localStorage.
         *
         * @example
         * ```javascript
         * nexys.getApiValues();
         * ```
         *
         * @public
         * @returns {APIValues} - Returns APIValues.
         *
         */
        Core.prototype.getApiValues = function () {
            if (!this._checkInitialized()) {
                return null;
            }
            return this._APIValues;
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/get-is-initialized
         *
         * @description This method will return if Nexys is initialized or not.
         *
         * @example
         * ```javascript
         * nexys.getIsInitialized();
         * ```
         *
         * @public
         * @returns {boolean} - Returns if Nexys is initialized or not.
         *
         */
        Core.prototype.getIsInitialized = function () {
            return this._initialized;
        };
        /**
         *
         * Documentation @see https://docs.nexys.app/functions/get-device-data
         *
         * @description This method will return DeviceData Nexys can gather.
         *
         * @example
         * ```javascript
         * nexys.getDeviceData();
         * ```
         *
         * @async - This method is async.
         * @public
         * @returns {Promise<getDeviceDataReturnTypes>} - Returns DeviceData.
         */
        Core.prototype.getDeviceData = function () {
            return __awaiter$6(this, void 0, void 0, function () {
                return __generator$6(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._checkInitialized()) {
                                return [2 /*return*/, null];
                            }
                            return [4 /*yield*/, this.Device.getDeviceData()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return Core;
    }());

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
    var __assign$5 = (undefined && undefined.__assign) || function () {
        __assign$5 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$5.apply(this, arguments);
    };
    var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$5 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var API = /** @class */ (function () {
        function API(core, _a) {
            var server = _a.server, apiKey = _a.apiKey, appName = _a.appName;
            this._server = "";
            this._apiKey = "";
            this._appName = "";
            this._sendingRequest = false;
            this.core = core;
            this._server = server;
            this._apiKey = apiKey;
            this._appName = appName;
        }
        API.prototype.sendRequest = function (_a) {
            var headers = _a.headers, data = _a.data;
            return __awaiter$5(this, void 0, void 0, function () {
                var server;
                var _this = this;
                return __generator$5(this, function (_b) {
                    if (!this.checkAvailability())
                        throw new Error("fetch is not defined (node environment)");
                    if (this._sendingRequest) {
                        throw new Error("API:ALREADY_SENDING");
                    }
                    this._sendingRequest = true;
                    this.core.Events.fire("request.sending", data);
                    server = "".concat(this._server, "/api/report/").concat(this._apiKey, "/").concat(this._appName);
                    this.core.InternalLogger.log("API: Sending request to server", server);
                    return [2 /*return*/, fetch(server, {
                            method: "POST",
                            headers: __assign$5({ "Content-Type": "application/json" }, headers),
                            body: JSON.stringify(data),
                        }).then(function (res) { return __awaiter$5(_this, void 0, void 0, function () {
                            var json;
                            return __generator$5(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        json = null;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, res.json()];
                                    case 2:
                                        json = _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _a.sent();
                                        json = null;
                                        throw new Error("API:FAILED:JSON_PARSE_ERROR");
                                    case 4:
                                        if (res === null || res === void 0 ? void 0 : res.ok) {
                                            this.requestCompleted();
                                            this.core.Events.fire("request.success", { res: res, json: json });
                                            return [2 /*return*/, {
                                                    res: res,
                                                    json: json,
                                                }];
                                        }
                                        throw new Error("API:FAILED:".concat(res.status, ":").concat(json === null || json === void 0 ? void 0 : json.error));
                                }
                            });
                        }); })];
                });
            });
        };
        API.prototype.sendData = function (data) {
            return __awaiter$5(this, void 0, void 0, function () {
                var _this = this;
                return __generator$5(this, function (_a) {
                    return [2 /*return*/, this.sendRequest({
                            data: data,
                        })
                            .then(function (res) { return __awaiter$5(_this, void 0, void 0, function () {
                            var data;
                            return __generator$5(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        data = res.json.data;
                                        return [4 /*yield*/, this.core.LocalStorage.setAPIValues(data)];
                                    case 1:
                                        _a.sent();
                                        this.core._APIValues = data;
                                        this.core.InternalLogger.log("API: Successful request", res);
                                        this.core.Events.fire("request.add", { res: res, json: res.json });
                                        return [4 /*yield*/, this.core.LogPool.clearRequests()];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, this.core.LogPool.clearLogs()];
                                    case 3:
                                        _a.sent();
                                        return [2 /*return*/, true];
                                }
                            });
                        }); })
                            .catch(function (err) { return __awaiter$5(_this, void 0, void 0, function () {
                            return __generator$5(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.core.InternalLogger.error("API: Request failed.", err);
                                        this.core.Events.fire("request.error", err);
                                        if ((err === null || err === void 0 ? void 0 : err.message) == "API:FAILED:400:api-key") {
                                            this.core.InternalLogger.error("API: Your API key is not valid. Please make sure you entered correct credentials.");
                                        }
                                        if (!((err === null || err === void 0 ? void 0 : err.message) != "API:ALREADY_SENDING")) return [3 /*break*/, 2];
                                        this.core.API.requestCompleted();
                                        return [4 /*yield*/, this.core.LogPool.pushRequest({
                                                res: {
                                                    message: err.message,
                                                    stack: err.stack,
                                                },
                                                status: "failed",
                                                ts: new Date().getTime(),
                                                guid: guid(),
                                            })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/, false];
                                }
                            });
                        }); })];
                });
            });
        };
        API.prototype.requestCompleted = function () {
            this._sendingRequest = false;
        };
        API.prototype.checkAvailability = function () {
            return typeof fetch !== "undefined";
        };
        return API;
    }());

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
    var __assign$4 = (undefined && undefined.__assign) || function () {
        __assign$4 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$4.apply(this, arguments);
    };
    var Events = /** @class */ (function () {
        function Events(core) {
            var _a, _b, _c;
            this._bindedErrorEvent = false;
            this.on = {};
            this.core = core;
            if ((_c = (_b = (_a = this.core) === null || _a === void 0 ? void 0 : _a._options) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c.allowAutomaticHandling) {
                this.setupEventHandlers();
                this.bindEvents();
            }
        }
        Events.prototype.bindEvents = function () {
            var _this = this;
            if (this._bindedErrorEvent) {
                this.core.InternalLogger.log("Events: Couldnt bind error event. Already binded.");
                return;
            }
            if (this.core._isClient) {
                this.core.InternalLogger.log("Events: Binding error events.");
                try {
                    window.addEventListener("error", function (event) {
                        event.stopImmediatePropagation();
                        if (event.error.hasBeenCaught !== undefined) {
                            return false;
                        }
                        event.error.hasBeenCaught = true;
                        _this.fire("errors.error", event);
                        return true;
                    });
                    window.addEventListener("unhandledrejection", function (event) {
                        event.stopImmediatePropagation();
                        _this.fire("errors.unhandled.rejection", event);
                        return true;
                    });
                    window.addEventListener("visibilitychange", function (event) {
                        _this.core.InternalLogger.log("Events: Received visibilitychange event", event);
                        if (document.visibilityState === "hidden") {
                            _this.fire("visibility.change", event);
                        }
                    });
                    this._bindedErrorEvent = true;
                    this.core.InternalLogger.log("Events: Binded error events.");
                    this.fire("events.bind.success");
                }
                catch (err) {
                    this.core.InternalLogger.log("Events: Couuldnt bind error event.", err);
                    this.fire("events.bind.failed");
                }
                return;
            }
            this.core.InternalLogger.log("Events: Couldnt bind error event. Not client.");
        };
        Events.prototype.setupEventHandlers = function () {
            var _this = this;
            this.subscribe("errors.error", function (event) {
                var _a, _b;
                _this.core.InternalLogger.log("Events: Received error", event);
                var extractedError = {
                    message: event === null || event === void 0 ? void 0 : event.message,
                    errmessage: (_a = event === null || event === void 0 ? void 0 : event.error) === null || _a === void 0 ? void 0 : _a.message,
                    stack: (_b = event === null || event === void 0 ? void 0 : event.error) === null || _b === void 0 ? void 0 : _b.stack,
                    type: event === null || event === void 0 ? void 0 : event.type,
                    colno: event === null || event === void 0 ? void 0 : event.colno,
                    lineno: event === null || event === void 0 ? void 0 : event.lineno,
                    filename: event === null || event === void 0 ? void 0 : event.filename,
                    defaultPrevented: event === null || event === void 0 ? void 0 : event.defaultPrevented,
                    isTrusted: event === null || event === void 0 ? void 0 : event.isTrusted,
                    timeStamp: event === null || event === void 0 ? void 0 : event.timeStamp,
                };
                _this.core.LogPool.push({
                    data: __assign$4({}, extractedError),
                    stack: extractedError.stack,
                    ts: new Date().getTime(),
                    options: {
                        type: "AUTO:ERROR",
                    },
                    guid: guid(),
                    path: getPagePath(_this.core),
                });
            });
            this.subscribe("errors.unhandled.rejection", function (event) {
                var _a, _b;
                _this.core.InternalLogger.log("Events: Received unhandledRejection: ", event);
                var extractedRejection = {
                    message: (_a = event === null || event === void 0 ? void 0 : event.reason) === null || _a === void 0 ? void 0 : _a.message,
                    stack: (_b = event === null || event === void 0 ? void 0 : event.reason) === null || _b === void 0 ? void 0 : _b.stack,
                    type: event === null || event === void 0 ? void 0 : event.type,
                    isTrusted: event === null || event === void 0 ? void 0 : event.isTrusted,
                    defaultPrevented: event === null || event === void 0 ? void 0 : event.defaultPrevented,
                    timeStamp: event === null || event === void 0 ? void 0 : event.timeStamp,
                };
                _this.core.LogPool.push({
                    data: __assign$4({}, extractedRejection),
                    stack: extractedRejection.stack,
                    ts: new Date().getTime(),
                    options: {
                        type: "AUTO:UNHANDLEDREJECTION",
                    },
                    guid: guid(),
                    path: getPagePath(_this.core),
                });
            });
            this.subscribe("request.success", function (event) {
                _this.core.InternalLogger.log("Events: Received request success: ", event);
            });
            this.subscribe("request.error", function (event) {
                var messages = {
                    "API:FAILED:400:app-name": "NexysCore: Your configured app name and the app name you entered on your project is mismatching. Please check your configuration. Erasing localStorage.",
                    "API:FAILED:400:not-verified": "NexysCore: Your project is not verified. Erasing localStorage.",
                    "API:FAILED:400:domain": "NexysCore: This domain is not allowed. Enable localhost access on your project if you are testing. Erasing localStorage.",
                };
                var message = messages[event.message];
                if (message) {
                    _this.core.InternalLogger.log(message);
                    _this.core.LocalStorage.clear();
                    _this.core.LogPool.clearLogs();
                    _this.core.LogPool.clearRequests();
                    return;
                }
                _this.core.InternalLogger.log("Events: Received request error: ", event);
            });
            this.subscribe("visibility.change", function (event) {
                _this.core.InternalLogger.log("Events: Received visibility.change: ", event);
                _this.core.LogPool.process();
            });
        };
        Events.prototype.fire = function (event, data) {
            var _this = this;
            // @ts-ignore
            if (this.on[event] == null || this.on[event] == undefined) {
                this.core.InternalLogger.log("Events: Event ".concat(event, " is not subscribed."));
                return;
            }
            this.core.InternalLogger.log("Events: Firing event ".concat(event));
            // @ts-ignore
            this.on[event].forEach(function (callback) {
                if (typeof callback !== "function") {
                    _this.core.InternalLogger.log("Events: Callback is not a function.", callback);
                    return;
                }
                callback(data);
            });
        };
        Events.prototype.subscribe = function (event, callback) {
            // @ts-ignore
            if (this.on[event] == null || this.on[event] == undefined) {
                // @ts-ignore
                this.on[event] = [];
            }
            // @ts-ignore
            this.on[event].push(callback);
        };
        Events.prototype.unsubscribe = function (event) {
            // @ts-ignore
            this.on[event] = null;
        };
        return Events;
    }());

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
    var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    /**
     * @class InternalLogger
     * @description This class is used to log internal errors or debug related logs to the console.
     */
    var InternalLogger = /** @class */ (function () {
        function InternalLogger(_a) {
            var active = _a.active;
            this._active = false;
            this.isAvailable = false;
            this._active = active;
            this.isAvailable = this.checkAvailability();
            if (this.isAvailable && this._active)
                this.log("InternalLogger: Active");
        }
        InternalLogger.prototype.checkAvailability = function () {
            try {
                if (typeof console !== "undefined" && typeof console.log === "function") {
                    return true;
                }
            }
            catch (e) {
                return false;
            }
            return false;
        };
        InternalLogger.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!this._active || !this.isAvailable)
                return;
            console.log.apply(console, __spreadArray(["📘 [NEXYS-DEBUG]: "], args, false));
        };
        InternalLogger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!this._active || !this.isAvailable)
                return;
            console.error.apply(console, __spreadArray(["📕 [NEXYS-ERROR]: "], args, false));
        };
        return InternalLogger;
    }());

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
    var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$4 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    /**
     * @class LocalStorage
     * @description This class is used to handle internal localStorage operations.
     */
    var LocalStorage = /** @class */ (function () {
        function LocalStorage(core, _a) {
            var key = _a.key, testKey = _a.testKey, isEncrypted = _a.isEncrypted, active = _a.active;
            var _b, _c;
            this._localStorage = null;
            this.isActive = false;
            this.isEncrypted = false;
            this.isAvailable = false;
            this.key = "__nex__";
            this.testKey = "__nex-t__";
            this.shouldUseLocalStorage = false;
            this.core = core;
            if (core._useLocalStorageAdapter) {
                if (typeof ((_b = this.core._options.localStorage) === null || _b === void 0 ? void 0 : _b.adapter) != "undefined") {
                    this._localStorage = (_c = this.core._options.localStorage) === null || _c === void 0 ? void 0 : _c.adapter;
                    this.core.InternalLogger.log("LocalStorage: Adapter", this._localStorage);
                }
                else {
                    this._localStorage = this.core._isClient ? window === null || window === void 0 ? void 0 : window.localStorage : null;
                    this.core.InternalLogger.error("LocalStorage: Using localStorage adapter fallback. (window.localStorage)");
                }
            }
            else {
                this._localStorage = this.core._isClient ? window === null || window === void 0 ? void 0 : window.localStorage : null;
                this.core.InternalLogger.log("LocalStorage: Using no localStorage adapter.");
            }
            this.key = key;
            this.testKey = testKey;
            this.isEncrypted = isEncrypted;
            this.isActive = active;
        }
        LocalStorage.prototype.setup = function () {
            return __awaiter$4(this, void 0, void 0, function () {
                var _a;
                return __generator$4(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.core.InternalLogger.log("LocalStorage: Available:", this.isAvailable);
                            if (!this.isActive) return [3 /*break*/, 2];
                            _a = this;
                            return [4 /*yield*/, this.checkAvailability()];
                        case 1:
                            _a.isAvailable = _b.sent();
                            this.core.InternalLogger.log("LocalStorage: Set to Active");
                            // We will not going to use localStorage if library is loaded in server environment.
                            this.shouldUseLocalStorage =
                                this.isAvailable && this._localStorage && this.core._isClient
                                    ? true
                                    : false;
                            if (this.shouldUseLocalStorage) {
                                this.core.InternalLogger.log("LocalStorage: Using localStorage.");
                            }
                            else {
                                this.core.InternalLogger.log("LocalStorage: Not using localStorage.");
                            }
                            _b.label = 2;
                        case 2: return [4 /*yield*/, this.init()];
                        case 3:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        LocalStorage.prototype.init = function () {
            return __awaiter$4(this, void 0, void 0, function () {
                var localItem;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/];
                            this.core.InternalLogger.log("LocalStorage: Initializing...");
                            return [4 /*yield*/, this.get()];
                        case 1:
                            localItem = _a.sent();
                            if (!localItem) return [3 /*break*/, 2];
                            this.core.InternalLogger.log("LocalStorage: Found local item:", localItem);
                            return [3 /*break*/, 4];
                        case 2:
                            this.core.InternalLogger.log("LocalStorage: No local item found.");
                            return [4 /*yield*/, this.resetLocalValue()];
                        case 3:
                            localItem = _a.sent();
                            _a.label = 4;
                        case 4:
                            this.core.Events.fire("localstorage.init", localItem);
                            return [2 /*return*/];
                    }
                });
            });
        };
        LocalStorage.prototype.removeItem = function (key) {
            var _a;
            return __awaiter$4(this, void 0, void 0, function () {
                return __generator$4(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/];
                            this.core.InternalLogger.log("LocalStorage: Removing...", key);
                            return [4 /*yield*/, ((_a = this._localStorage) === null || _a === void 0 ? void 0 : _a.removeItem(key))];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        LocalStorage.prototype.setItem = function (key, value) {
            var _a;
            return __awaiter$4(this, void 0, void 0, function () {
                return __generator$4(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/];
                            //this.core.InternalLogger.log("LocalStorage: Setting...", value);
                            return [4 /*yield*/, ((_a = this._localStorage) === null || _a === void 0 ? void 0 : _a.setItem(key, value))];
                        case 1:
                            //this.core.InternalLogger.log("LocalStorage: Setting...", value);
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        LocalStorage.prototype.getItem = function (key) {
            var _a;
            return __awaiter$4(this, void 0, void 0, function () {
                return __generator$4(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/, null];
                            return [4 /*yield*/, ((_a = this._localStorage) === null || _a === void 0 ? void 0 : _a.getItem(key))];
                        case 1: 
                        //this.core.InternalLogger.log("LocalStorage: Getting...", key);
                        return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        LocalStorage.prototype.checkAvailability = function () {
            var _a, _b, _c;
            return __awaiter$4(this, void 0, void 0, function () {
                var item;
                return __generator$4(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!this.core._isClient)
                                return [2 /*return*/, false];
                            this.core.InternalLogger.log("LocalStorage: Checking availability...");
                            if (typeof this._localStorage == "undefined") {
                                this.core.InternalLogger.log("LocalStorage: Not available - cant check availability.");
                                return [2 /*return*/, false];
                            }
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 5, , 6]);
                            this.core.InternalLogger.log("LocalStorage: Checking setItem...");
                            return [4 /*yield*/, ((_a = this._localStorage) === null || _a === void 0 ? void 0 : _a.setItem(this.testKey, this.testKey))];
                        case 2:
                            _d.sent();
                            return [4 /*yield*/, ((_b = this._localStorage) === null || _b === void 0 ? void 0 : _b.getItem(this.testKey))];
                        case 3:
                            item = _d.sent();
                            this.core.InternalLogger.log("LocalStorage: Checking Item:", item);
                            if (item != this.testKey) {
                                this.core.InternalLogger.log("LocalStorage: Not available - item is not equal to testKey.");
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, ((_c = this._localStorage) === null || _c === void 0 ? void 0 : _c.removeItem(this.testKey))];
                        case 4:
                            _d.sent();
                            return [2 /*return*/, true];
                        case 5:
                            _d.sent();
                            return [2 /*return*/, false];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        // Returns any since item can be anything
        LocalStorage.prototype.get = function () {
            return __awaiter$4(this, void 0, void 0, function () {
                var localItem, parsed;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/, null];
                            localItem = null;
                            parsed = null;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, (this === null || this === void 0 ? void 0 : this.getItem(this.key))];
                        case 2:
                            localItem = _a.sent();
                            if (!localItem) {
                                return [2 /*return*/, null];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, null];
                        case 4:
                            if (this.isEncrypted) {
                                // Decode with Base64.
                                try {
                                    localItem = Base64.decode(localItem);
                                }
                                catch (e) {
                                    this.clear(); // Clear localStorage so we can start fresh.
                                    return [2 /*return*/, null];
                                }
                            }
                            try {
                                parsed = JSON.parse(localItem);
                            }
                            catch (e) {
                                this.clear(); // Clear localStorage so we can start fresh.
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, parsed];
                    }
                });
            });
        };
        LocalStorage.prototype.set = function (value) {
            return __awaiter$4(this, void 0, void 0, function () {
                var localItem;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/];
                            localItem = value;
                            try {
                                localItem = JSON.stringify(localItem);
                            }
                            catch (e) {
                                return [2 /*return*/];
                            }
                            if (this.isEncrypted) {
                                // Encode with Base64.
                                try {
                                    localItem = Base64.encode(localItem);
                                }
                                catch (e) {
                                    return [2 /*return*/];
                                }
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, (this === null || this === void 0 ? void 0 : this.setItem(this.key, localItem))];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // This function overrides specified values.
        LocalStorage.prototype.setOverride = function (value) {
            return __awaiter$4(this, void 0, void 0, function () {
                var localValue, merged;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.get()];
                        case 1:
                            localValue = _a.sent();
                            merged = Object.assign({}, value, localValue);
                            return [4 /*yield*/, this.set(merged)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        LocalStorage.prototype.clear = function () {
            var _a;
            return __awaiter$4(this, void 0, void 0, function () {
                return __generator$4(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/];
                            this.core.InternalLogger.log("LocalStorage: Clearing everything.");
                            return [4 /*yield*/, ((_a = this === null || this === void 0 ? void 0 : this._localStorage) === null || _a === void 0 ? void 0 : _a.clear())];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        LocalStorage.prototype.clearLogPool = function () {
            return __awaiter$4(this, void 0, void 0, function () {
                var localValue;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.get()];
                        case 1:
                            localValue = _a.sent();
                            if (!localValue) {
                                this.core.InternalLogger.log("LocalStorage: Local value is null in clearLogPool.");
                                this.resetLocalValue();
                                return [2 /*return*/];
                            }
                            localValue.logPool = [];
                            this.set(localValue);
                            return [2 /*return*/];
                    }
                });
            });
        };
        LocalStorage.prototype.clearRequests = function () {
            return __awaiter$4(this, void 0, void 0, function () {
                var localValue;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.get()];
                        case 1:
                            localValue = _a.sent();
                            if (!localValue) {
                                this.core.InternalLogger.log("LocalStorage: Local value is null in clearRequests.");
                                this.resetLocalValue();
                                return [2 /*return*/];
                            }
                            localValue.requests = [];
                            this.set(localValue);
                            return [2 /*return*/];
                    }
                });
            });
        };
        LocalStorage.prototype.addToLogPool = function (_a) {
            var data = _a.data, options = _a.options, guid = _a.guid, path = _a.path, stack = _a.stack;
            return __awaiter$4(this, void 0, void 0, function () {
                var localValue;
                return __generator$4(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.get()];
                        case 1:
                            localValue = _b.sent();
                            if (!!localValue) return [3 /*break*/, 4];
                            this.core.InternalLogger.log("LocalStorage: Local value is null in addToLogPool.");
                            return [4 /*yield*/, this.resetLocalValue()];
                        case 2:
                            _b.sent();
                            // Resets and pushes first log.
                            localValue = {
                                logPool: [
                                    { ts: new Date().getTime(), data: data, options: options, guid: guid, path: path, stack: stack },
                                ],
                                requests: [],
                                lastLogUpdate: new Date().getTime(),
                            };
                            return [4 /*yield*/, this.set(localValue)];
                        case 3:
                            _b.sent();
                            return [2 /*return*/];
                        case 4:
                            localValue.logPool.push({
                                ts: new Date().getTime(),
                                data: data,
                                options: options,
                                guid: guid,
                                path: path,
                                stack: stack,
                            });
                            localValue.lastLogUpdate = new Date().getTime();
                            return [4 /*yield*/, this.set(localValue)];
                        case 5:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        LocalStorage.prototype.addToRequest = function (_a) {
            var res = _a.res, status = _a.status, ts = _a.ts, guid = _a.guid;
            return __awaiter$4(this, void 0, void 0, function () {
                var localValue;
                return __generator$4(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.get()];
                        case 1:
                            localValue = _b.sent();
                            if (!!localValue) return [3 /*break*/, 4];
                            this.core.InternalLogger.log("LocalStorage: Local value is null in addToRequest.");
                            return [4 /*yield*/, this.resetLocalValue()];
                        case 2:
                            _b.sent();
                            // Resets and pushes first log.
                            localValue = {
                                logPool: [],
                                requests: [{ res: res, status: status, ts: ts, guid: guid }],
                                lastLogUpdate: 0,
                            };
                            return [4 /*yield*/, this.set(localValue)];
                        case 3:
                            _b.sent();
                            return [2 /*return*/];
                        case 4:
                            localValue.requests.push({ res: res, status: status, ts: ts, guid: guid });
                            return [4 /*yield*/, this.set(localValue)];
                        case 5:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        LocalStorage.prototype.getLocalLogs = function () {
            return __awaiter$4(this, void 0, void 0, function () {
                var localValue, logPool;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/, null];
                            return [4 /*yield*/, this.get()];
                        case 1:
                            localValue = _a.sent();
                            if (!!localValue) return [3 /*break*/, 3];
                            this.core.InternalLogger.log("LocalStorage: Local value is null in getLocalLogs.");
                            return [4 /*yield*/, this.resetLocalValue()];
                        case 2:
                            logPool = (_a.sent()).logPool;
                            return [2 /*return*/, logPool];
                        case 3: return [2 /*return*/, localValue === null || localValue === void 0 ? void 0 : localValue.logPool];
                    }
                });
            });
        };
        LocalStorage.prototype.getLocalRequests = function () {
            return __awaiter$4(this, void 0, void 0, function () {
                var localValue, requests;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/, null];
                            return [4 /*yield*/, this.get()];
                        case 1:
                            localValue = _a.sent();
                            if (!!localValue) return [3 /*break*/, 3];
                            this.core.InternalLogger.log("LocalStorage: Local value is null in getLocalRequests.");
                            return [4 /*yield*/, this.resetLocalValue()];
                        case 2:
                            requests = (_a.sent()).requests;
                            return [2 /*return*/, requests];
                        case 3: return [2 /*return*/, localValue === null || localValue === void 0 ? void 0 : localValue.requests];
                    }
                });
            });
        };
        LocalStorage.prototype.getLocalUser = function () {
            var _a;
            return __awaiter$4(this, void 0, void 0, function () {
                var localValue;
                return __generator$4(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/, null];
                            return [4 /*yield*/, this.get()];
                        case 1:
                            localValue = _b.sent();
                            if (!localValue) {
                                this.core.InternalLogger.log("LocalStorage: Local value is null in getLocalUserData.");
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, ((_a = localValue === null || localValue === void 0 ? void 0 : localValue.userData) === null || _a === void 0 ? void 0 : _a.user) || null];
                    }
                });
            });
        };
        LocalStorage.prototype.resetLocalValue = function () {
            return __awaiter$4(this, void 0, void 0, function () {
                var val;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.core.InternalLogger.log("LocalStorage: Resetting local value in resetLocalValue.");
                            val = {
                                logPool: [],
                                requests: [],
                                lastLogUpdate: 0,
                            };
                            return [4 /*yield*/, this.set(val)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, val];
                    }
                });
            });
        };
        LocalStorage.prototype.setAPIValues = function (value) {
            return __awaiter$4(this, void 0, void 0, function () {
                var localValue;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.get()];
                        case 1:
                            localValue = _a.sent();
                            if (!!localValue) return [3 /*break*/, 3];
                            this.core.InternalLogger.log("LocalStorage: Local value is null in setAPIValue.");
                            this.resetLocalValue();
                            return [4 /*yield*/, this.get()];
                        case 2:
                            localValue = _a.sent();
                            return [2 /*return*/];
                        case 3:
                            localValue.API = value;
                            this.set(localValue);
                            return [2 /*return*/];
                    }
                });
            });
        };
        LocalStorage.prototype.getAPIValues = function () {
            return __awaiter$4(this, void 0, void 0, function () {
                var localValue;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage)
                                return [2 /*return*/, null];
                            return [4 /*yield*/, this.get()];
                        case 1:
                            localValue = _a.sent();
                            if (!localValue) {
                                this.core.InternalLogger.log("LocalStorage: Local value is null in getAPIValue.");
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, localValue.API || null];
                    }
                });
            });
        };
        LocalStorage.prototype.setUser = function (user) {
            return __awaiter$4(this, void 0, void 0, function () {
                var localValue;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.shouldUseLocalStorage) {
                                this.core.InternalLogger.log("LocalStorage: Not using localStorage in setUser.");
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.get()];
                        case 1:
                            localValue = _a.sent();
                            if (!!localValue) return [3 /*break*/, 4];
                            this.core.InternalLogger.log("LocalStorage: Local value is null in setUser.");
                            return [4 /*yield*/, this.resetLocalValue()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.get()];
                        case 3:
                            localValue = _a.sent();
                            return [2 /*return*/];
                        case 4:
                            if (!localValue.userData) {
                                localValue.userData = {};
                            }
                            localValue.userData.user = user;
                            return [4 /*yield*/, this.set(localValue)];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return LocalStorage;
    }());

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
    var __assign$3 = (undefined && undefined.__assign) || function () {
        __assign$3 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$3.apply(this, arguments);
    };
    var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$3 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var LogPool = /** @class */ (function () {
        function LogPool(core) {
            // All logs stored here.
            this.logs = [];
            this.requests = [];
            this.core = core;
            this.core.Events.fire("logpool.init");
        }
        LogPool.prototype.setLogs = function (logs) {
            if (!Array.isArray(logs))
                throw new Error("LogPool: setLogs() expects an array.");
            // Checking if logs has timestamps and data.
            logs.forEach(function (log) {
                if (!log.ts || !log.data || !log.guid)
                    throw new Error("LogPool: setLogs() expects an array of logs.");
            });
            this.logs = logs;
            this.process();
        };
        LogPool.prototype.setRequests = function (requests) {
            if (!Array.isArray(requests))
                throw new Error("LogPool: setRequests() expects an array.");
            // Checking if requests has timestamps and data.
            requests.forEach(function (request) {
                if (!(request === null || request === void 0 ? void 0 : request.res) || !(request === null || request === void 0 ? void 0 : request.status) || !(request === null || request === void 0 ? void 0 : request.ts) || !(request === null || request === void 0 ? void 0 : request.guid))
                    throw new Error("LogPool: setRequests() expects an array of requests.");
            });
            this.requests = requests;
            // Also process logs.
            this.process();
        };
        LogPool.prototype.push = function (_a) {
            var data = _a.data, options = _a.options, ts = _a.ts, guid = _a.guid, path = _a.path, stack = _a.stack;
            return __awaiter$3(this, void 0, void 0, function () {
                var log;
                return __generator$3(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            log = {
                                data: data,
                                options: options,
                                ts: ts,
                                guid: guid,
                                path: path,
                                stack: stack,
                            };
                            this.logs.push(log);
                            this.process();
                            this.core.Events.fire("log.add", log);
                            return [4 /*yield*/, this.core.LocalStorage.addToLogPool(log)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        LogPool.prototype.pushRequest = function (_a) {
            var res = _a.res, status = _a.status, ts = _a.ts, guid = _a.guid;
            return __awaiter$3(this, void 0, void 0, function () {
                var req;
                return __generator$3(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            req = {
                                res: res,
                                status: status,
                                ts: ts,
                                guid: guid,
                            };
                            this.core.InternalLogger.log("LogPool: Pushing request to requests array.", req);
                            this.requests.push(req);
                            this.core.Events.fire("request.add", req);
                            return [4 /*yield*/, this.core.LocalStorage.addToRequest(req)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        LogPool.prototype.clearLogs = function () {
            return __awaiter$3(this, void 0, void 0, function () {
                return __generator$3(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logs = [];
                            return [4 /*yield*/, this.core.LocalStorage.clearLogPool()];
                        case 1:
                            _a.sent();
                            this.core.Events.fire("logs.clear");
                            this.core.InternalLogger.log("LogPool: Cleared logs.");
                            return [2 /*return*/];
                    }
                });
            });
        };
        LogPool.prototype.clearRequests = function () {
            return __awaiter$3(this, void 0, void 0, function () {
                return __generator$3(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.requests = [];
                            return [4 /*yield*/, this.core.LocalStorage.clearRequests()];
                        case 1:
                            _a.sent();
                            this.core.Events.fire("requests.clear");
                            this.core.InternalLogger.log("LogPool: Cleared requests.");
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Process internal data to determine whether or not we should need to send data to the server.
         */
        LogPool.prototype.process = function () {
            var _a, _b;
            return __awaiter$3(this, void 0, void 0, function () {
                var sendAllOnType, i, log, i, log, logsLength, diffLength;
                var _this = this;
                return __generator$3(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            this.core.InternalLogger.log("LogPool: Processing logs...");
                            if (!(this.logs.length > 0 && this.core._logPoolSize != 0)) return [3 /*break*/, 9];
                            sendAllOnType = this.core._sendAllOnType;
                            if (!sendAllOnType)
                                return [2 /*return*/];
                            if (!Array.isArray(sendAllOnType)) return [3 /*break*/, 5];
                            i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(i < this.logs.length)) return [3 /*break*/, 4];
                            log = this.logs[i];
                            if (!((_a = log === null || log === void 0 ? void 0 : log.options) === null || _a === void 0 ? void 0 : _a.type))
                                return [3 /*break*/, 3];
                            if (this.core.API._sendingRequest)
                                return [3 /*break*/, 3];
                            if (!sendAllOnType.includes(log.options.type)) return [3 /*break*/, 3];
                            this.core.InternalLogger.log("LogPool: sendAllOnType is array and log includes ".concat(log.options.type, " type."));
                            return [4 /*yield*/, this.sendAll()];
                        case 2:
                            _c.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [3 /*break*/, 9];
                        case 5:
                            i = 0;
                            _c.label = 6;
                        case 6:
                            if (!(i < this.logs.length)) return [3 /*break*/, 9];
                            log = this.logs[i];
                            if (!((_b = log === null || log === void 0 ? void 0 : log.options) === null || _b === void 0 ? void 0 : _b.type))
                                return [3 /*break*/, 8];
                            if (this.core.API._sendingRequest)
                                return [3 /*break*/, 8];
                            if (!(log.options.type == sendAllOnType)) return [3 /*break*/, 8];
                            this.core.InternalLogger.log("LogPool: sendAllOnType is string and log is ".concat(log.options.type, " type."));
                            return [4 /*yield*/, this.sendAll()];
                        case 7:
                            _c.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            i++;
                            return [3 /*break*/, 6];
                        case 9:
                            logsLength = 0;
                            logsLength = this.logs.filter(function (log) {
                                var _a;
                                if (!((_a = log === null || log === void 0 ? void 0 : log.options) === null || _a === void 0 ? void 0 : _a.type))
                                    return true;
                                if (Array.isArray(_this.core._ignoreType) &&
                                    _this.core._ignoreType.includes(log.options.type))
                                    return false;
                                if (typeof _this.core._ignoreType == "string" &&
                                    _this.core._ignoreType == log.options.type)
                                    return false;
                                return true;
                            }).length;
                            diffLength = this.logs.length - logsLength;
                            if (diffLength > this.core._ignoreTypeSize) {
                                this.core.InternalLogger.log("LogPool: diffLength (this.logs.length - logsLength): ".concat(diffLength, " ignoreTypeSize: ").concat(this.core._ignoreTypeSize, " - Ignored logs max reached."));
                                logsLength += diffLength;
                            }
                            else {
                                this.core.InternalLogger.log("LogPool: Ignoring ".concat(diffLength, " logs. ignoreType: ").concat(this.core._ignoreType, " ignoreTypeSize: ").concat(this.core._ignoreTypeSize));
                            }
                            if (logsLength < this.core._logPoolSize) {
                                this.core.InternalLogger.log("LogPool: logPoolSize is ".concat(this.core._logPoolSize, " but logs length is ").concat(logsLength));
                                return [2 /*return*/];
                            }
                            if (this.core.API._sendingRequest) {
                                this.core.InternalLogger.log("LogPool: Already sending request to the server.");
                                return [2 /*return*/];
                            }
                            this.core.Events.fire("logpool.process");
                            this.sendAll();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Sends all data on Nexys to the server.
         */
        LogPool.prototype.sendAll = function () {
            return __awaiter$3(this, void 0, void 0, function () {
                var _start, _end, CollectData, sent;
                return __generator$3(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _start = null, _end = null;
                            if (this.core._isClient)
                                _start = performance.now();
                            this.core.InternalLogger.log("LogPool: sendAll() called.");
                            if (this.logs.length === 0 && this.requests.length === 0) {
                                this.core.InternalLogger.error("LogPool: No logs or requests to send.");
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, collectData(this.core)];
                        case 1:
                            CollectData = _a.sent();
                            if (!CollectData) {
                                this.core.InternalLogger.error("LogPool: collectData() returned null.");
                                return [2 /*return*/];
                            }
                            CollectData = __assign$3(__assign$3({}, CollectData), { logs: this.logs, requests: this.requests });
                            this.core.InternalLogger.log("LogPool: Sending data to the server.", CollectData);
                            return [4 /*yield*/, this.core.API.sendData(CollectData)];
                        case 2:
                            sent = _a.sent();
                            if (this.core._isClient)
                                _end = performance.now();
                            if (!(_start && _end && sent)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.core.LogPool.push({
                                    data: {
                                        type: "LOGPOOL:SENDALL",
                                        diff: _end - _start,
                                    },
                                    ts: new Date().getTime(),
                                    options: {
                                        type: "METRIC",
                                    },
                                    guid: guid(),
                                    path: getPagePath(this.core),
                                })];
                        case 3:
                            _a.sent();
                            this.core.InternalLogger.log("API: Request took ".concat(_end - _start, "ms."));
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return LogPool;
    }());

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
    var __assign$2 = (undefined && undefined.__assign) || function () {
        __assign$2 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$2.apply(this, arguments);
    };
    var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$2 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var Device = /** @class */ (function () {
        function Device(core) {
            this._isAvailable = false;
            this.core = core;
            this._isAvailable = this.core._isClient && this.checkAvailability();
            this.core.Events.fire("device.init");
        }
        Device.prototype.checkAvailability = function () {
            if (typeof navigator !== "undefined") {
                return true;
            }
            return false;
        };
        Device.prototype.getPlatform = function () {
            if (!this._isAvailable)
                return null;
            return navigator.platform;
        };
        Device.prototype.getLanguage = function () {
            if (!this._isAvailable)
                return null;
            return navigator.language;
        };
        Device.prototype.getVendor = function () {
            if (!this._isAvailable)
                return null;
            return navigator.vendor;
        };
        Device.prototype.getDeviceMemory = function () {
            if (!this._isAvailable)
                return null;
            if ("deviceMemory" in navigator) {
                // We are ignoring because deviceMemory is not yet supported by all browsers.
                /** @ts-ignore */
                return navigator.deviceMemory;
            }
            return null;
        };
        Device.prototype.getHardwareConcurrency = function () {
            if (!this._isAvailable)
                return null;
            if ("hardwareConcurrency" in navigator) {
                // We are ignoring because hardwareConcurrency is not yet supported by all browsers.
                /** @ts-ignore */
                return navigator.hardwareConcurrency;
            }
            return null;
        };
        Device.prototype.getGeolocation = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!_this._isAvailable) {
                    reject(null);
                    return;
                }
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                    return;
                }
                reject(null);
            });
        };
        Device.prototype.getBattery = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!_this._isAvailable) {
                    reject(null);
                    return;
                }
                if ("getBattery" in navigator) {
                    // We are ignoring because getBattery is not yet supported by all browsers.
                    /** @ts-ignore */
                    navigator.getBattery().then(resolve, reject);
                }
                reject(null);
            });
        };
        Device.prototype.getUserAgent = function () {
            if (!this._isAvailable)
                return null;
            if ("userAgent" in navigator) {
                return navigator.userAgent;
            }
            return null;
        };
        Device.prototype.getConnection = function () {
            return __awaiter$2(this, void 0, void 0, function () {
                var _this = this;
                return __generator$2(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!_this._isAvailable) {
                                reject(null);
                                return;
                            }
                            if ("connection" in navigator) {
                                /** @ts-ignore */
                                resolve(navigator.connection);
                            }
                            reject(null);
                        })];
                });
            });
        };
        Device.prototype.getScreen = function () {
            var _a, _b, _c, _d, _e, _f;
            if (!this._isAvailable)
                return null;
            return {
                height: (_a = window.screen) === null || _a === void 0 ? void 0 : _a.height,
                width: (_b = window.screen) === null || _b === void 0 ? void 0 : _b.width,
                colorDepth: (_c = window.screen) === null || _c === void 0 ? void 0 : _c.colorDepth,
                availHeight: (_d = window.screen) === null || _d === void 0 ? void 0 : _d.availHeight,
                availWidth: (_e = window.screen) === null || _e === void 0 ? void 0 : _e.availWidth,
                pixelDepth: (_f = window.screen) === null || _f === void 0 ? void 0 : _f.pixelDepth,
            };
        };
        Device.prototype.getDeviceData = function () {
            return __awaiter$2(this, void 0, void 0, function () {
                var battery, connection, deviceData, geo;
                return __generator$2(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._isAvailable) {
                                return [2 /*return*/, Promise.reject(null)];
                            }
                            if (!this.core._allowDeviceData) {
                                this.core.InternalLogger.log("Device: Device data is disabled but getDeviceData() is called.");
                                return [2 /*return*/, Promise.reject(null)];
                            }
                            return [4 /*yield*/, this.getBattery().catch(function (err) { return null; })];
                        case 1:
                            battery = _a.sent();
                            return [4 /*yield*/, this.getConnection().catch(function (err) { return null; })];
                        case 2:
                            connection = _a.sent();
                            deviceData = {
                                platform: this.getPlatform(),
                                language: this.getLanguage(),
                                vendor: this.getVendor(),
                                deviceMemory: this.getDeviceMemory(),
                                hardwareConcurrency: this.getHardwareConcurrency(),
                                userAgent: this.getUserAgent(),
                                screen: this.getScreen(),
                                battery: battery,
                                connection: connection,
                            };
                            if (!this.core._allowGeoLocation) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.getGeolocation().catch(function (err) { return null; })];
                        case 3:
                            geo = _a.sent();
                            deviceData = __assign$2(__assign$2({}, deviceData), { geo: geo });
                            _a.label = 4;
                        case 4: return [2 /*return*/, Promise.resolve(deviceData)];
                    }
                });
            });
        };
        return Device;
    }());

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
    var __assign$1 = (undefined && undefined.__assign) || function () {
        __assign$1 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
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
                vnode = __assign$1(__assign$1({}, vnode), { props: props });
            }
            if (value) {
                vnode = __assign$1(__assign$1({}, vnode), { value: value });
            }
            if (onClick) {
                vnode = __assign$1(__assign$1({}, vnode), { onClick: onClick });
            }
            if (typeof children != "undefined") {
                vnode = __assign$1({}, vnode);
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

    function isNewerVersion(oldVer, newVer) {
        var oldParts = oldVer.split(".");
        var newParts = newVer.split(".");
        for (var i = 0; i < newParts.length; i++) {
            var a = ~~newParts[i];
            var b = ~~oldParts[i];
            if (a > b)
                return true;
            if (a < b)
                return false;
        }
        return false;
    }

    function checkVersion(core) {
        if (!core._APIValues || !core._APIValues.client)
            return;
        var isCloseToLimit = core._APIValues.logUsage >= core._APIValues.logUsageLimit * 0.8;
        var isOverLimit = core._APIValues.logUsage >= core._APIValues.logUsageLimit;
        var isNeedSoftUpdate = isNewerVersion(core._version, core._APIValues.client.softVersion);
        var isNeedHardUpdate = isNewerVersion(core._version, core._APIValues.client.hardVersion);
        var isNeedUpdate = isNewerVersion(core._version, core._APIValues.client.latestVersion);
        if (isCloseToLimit) {
            core.InternalLogger.log("NexysCore: You are getting close to log limit. Please consider to upgrade your plan.");
        }
        if (isOverLimit) {
            core.InternalLogger.log("NexysCore: You are over log limit. Please consider to upgrade your plan.");
        }
        if (!isNeedHardUpdate && (isNeedUpdate || isNeedSoftUpdate)) {
            core.InternalLogger.log("NexysCore: You are using version ".concat(core._version, " and latest version is ").concat(core._APIValues.client.softVersion, ". You need to upgrade your library."));
        }
        if (isNeedHardUpdate) {
            core.InternalLogger.error("NexysCore: You are using version ".concat(core._version, " and latest version is ").concat(core._APIValues.client.hardVersion, ". You wont be able to use Nexys with this version. Please upgrade your library."));
            //core._initialized = false;
        }
        core.InternalLogger.log("NexysCore: Version check done. ".concat(core._version, " is up to date. SOFT:").concat(core._APIValues.client.softVersion, " - HARD:").concat(core._APIValues.client.hardVersion, " - LAT:").concat(core._APIValues.client.latestVersion));
    }

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
    var __assign = (undefined && undefined.__assign) || function () {
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
    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    function loadFromLocalStorage(core) {
        var _a, _b, _c, _d, _e;
        return __awaiter$1(this, void 0, void 0, function () {
            var localLogs, localRequests, localUser, APIValues;
            return __generator$1(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, core.LocalStorage.getLocalLogs()];
                    case 1:
                        localLogs = _f.sent();
                        if (Array.isArray(localLogs) &&
                            localLogs.length > 0 &&
                            ((_a = core._options.localStorage) === null || _a === void 0 ? void 0 : _a.useLocalStorage)) {
                            core.LogPool.setLogs(localLogs);
                            core.InternalLogger.log("NexysCore: Set logs from localStorage.", localLogs);
                        }
                        else if (Array.isArray(localLogs) &&
                            localLogs.length == 0 &&
                            ((_b = core._options.localStorage) === null || _b === void 0 ? void 0 : _b.useLocalStorage)) {
                            core.InternalLogger.log("NexysCore: LocalStorage is empty, no logs found.");
                        }
                        return [4 /*yield*/, core.LocalStorage.getLocalRequests()];
                    case 2:
                        localRequests = _f.sent();
                        if (Array.isArray(localRequests) &&
                            localRequests.length > 0 &&
                            ((_c = core._options.localStorage) === null || _c === void 0 ? void 0 : _c.useLocalStorage)) {
                            core.LogPool.setRequests(localRequests);
                            core.InternalLogger.log("NexysCore: Set requests from localStorage.", localRequests);
                        }
                        else if (Array.isArray(localRequests) &&
                            localRequests.length == 0 &&
                            ((_d = core._options.localStorage) === null || _d === void 0 ? void 0 : _d.useLocalStorage)) {
                            core.InternalLogger.log("NexysCore: LocalStorage is empty, no requests found.");
                        }
                        if (!((_e = core._options.localStorage) === null || _e === void 0 ? void 0 : _e.useLocalStorage)) return [3 /*break*/, 4];
                        return [4 /*yield*/, core.LocalStorage.getLocalUser()];
                    case 3:
                        localUser = _f.sent();
                        if (localUser) {
                            core._config = __assign(__assign({}, core._config), { user: localUser });
                            core.InternalLogger.log("NexysCore: Set user from localStorage.", localUser);
                        }
                        else {
                            core.InternalLogger.log("NexysCore: LocalStorage is empty, no user found.");
                        }
                        _f.label = 4;
                    case 4: return [4 /*yield*/, core.LocalStorage.getAPIValues()];
                    case 5:
                        APIValues = _f.sent();
                        if (APIValues) {
                            core._APIValues = APIValues;
                            core.InternalLogger.log("NexysCore: Set API values from localStorage.", APIValues);
                            checkVersion(core);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }

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
    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    /**
     * Nexys Client Library
     *
     * @remarks This package coordinates the communication between the Nexys client library and dashboard server.
     * @packageDocumentation
     */
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
    var Nexys = /** @class */ (function (_super) {
        __extends(Nexys, _super);
        /**
         *
         * Documentation
         * @see https://docs.nexys.app
         *
         * Creates a Nexys instance that can be used anywhere in your application.
         *
         * @example
         * ```javascript
         * // Import the client
         * import Nexys from "nexys";
         * // Create a new instance
         * const nexys = new Nexys("API_KEY", { appName: "My_app" });
         * // Initialize the client
         * nexys.init()
         * // Push a log
         * nexys.log("Hello World");
         * ```
         *
         * @param API_KEY - `Required` - `string` - The Public API key you retrieve from our dashboard
         * @param options - `Required` - `object` - Object containing all options below
         * @param options.appName - `Required` - `string` - Name of your application
         * @param options.debug - `Optional` - `boolean` - Enables debug mode for internal logs - Default is `false`
         * @param options.logPoolSize - `Optional` - `number` - Sets the logPool max log size to send when logPool size exceedes this limit - Default is `10`
         * @param options.sendAllOnType - `Optional` - `logOptionTypes | logOptionTypes[] | false` - Ignores logPoolSize when any log with specified type is recieved sends data to API - Default is `["AUTO:ERROR", "AUTO:UNHANDLEDREJECTION", "ERROR"]`
         * @param options.ignoreType - `Optional` - `logOptionTypes | logOptionTypes[] | false` - Ignores logs with specified type (these logs will not count as log and not affect logPool length but will be sent if any request be made) - Default is `"METRIC"`
         * @param options.ignoreTypeSize - `Optional` - `number` - Determine max length of ignored log types could be stored in logPool before sending request - Keeping this number high is preferred - Default is `50`
         * @param options.server - `Optional` - `string` - Change logging server - Default is `https://dash.nexys.app`
         * @param options.allowDeviceData - `Optional` - `boolean` - Should send device data - Collects device data - Default is `true`
         * @param options.allowGeoLocation - `Optional` - `boolean` - Should send geolocation data - Disable if you dont want your users to get notified for geolocation - Default is `false`
         * @param options.allowElementData - `Optional` - `boolean` - Should send body element data - Collects body element data - Default is `true`
         * @param options.localStorage - `Optional` - `object` - Object containing options about localStorage
         * @param options.localStorage.useLocalStorage - `Optional` - `boolean` - Should use localStorage - Nexys will try to use localStorage if available if value is true - Default is `true`
         * @param options.localStorage.cryption - `Optional` - `boolean` - Should use cryption on localStorage - Default is `true`
         * @param options.localStorage.key - `Optional` - `string` - Change localStorage key - Default is `__nexysLogPool__`
         * @param options.localStorage.testKey - `Optional` - `string` - Use a different localStorage key for testing localStorage availability - Default is `__nexysTest__`
         * @param options.errors - `Optional` - `object` - Object containing error related options
         * @param options.errors.allowAutomaticHandling - `Optional` - `boolean` - Set automatic error handling - Default is `true`
         *
         * @returns A Nexys instance
         */
        function Nexys(API_KEY, options) {
            return _super.call(this, API_KEY, options) || this;
        }
        /**
         * Initializes the client.
         *
         * @example
         * ```javascript
         * // Create a new instance
         * const nexys = new Nexys("API_KEY", { appName: "My_app" });
         * // Initialize the client
         * nexys.init()
         * ```
         *
         * @public
         * @returns {void} - Returns nothing.
         *
         */
        Nexys.prototype.init = function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            if (this._checkInitialized()) {
                this.InternalLogger.log("NexysCore: Already initialized but called nexys.init()");
                return;
            }
            var _start = null, _end = null;
            if (this._isClient)
                _start = performance.now();
            this.InternalLogger = new InternalLogger({
                active: (_b = (_a = this._options) === null || _a === void 0 ? void 0 : _a.debug) !== null && _b !== void 0 ? _b : false,
            });
            this.Events = new Events(this);
            this.LogPool = new LogPool(this);
            this.API = new API(this, {
                server: this._server,
                apiKey: this._apiKey,
                appName: this._options.appName || "",
            });
            this.Device = new Device(this);
            this.LocalStorage = new LocalStorage(this, {
                key: (_d = (_c = this._options.localStorage) === null || _c === void 0 ? void 0 : _c.key) !== null && _d !== void 0 ? _d : (_e = defaultOptions.localStorage) === null || _e === void 0 ? void 0 : _e.key,
                testKey: (_g = (_f = this._options.localStorage) === null || _f === void 0 ? void 0 : _f.testKey) !== null && _g !== void 0 ? _g : (_h = defaultOptions.localStorage) === null || _h === void 0 ? void 0 : _h.testKey,
                isEncrypted: (_k = (_j = this._options.localStorage) === null || _j === void 0 ? void 0 : _j.cryption) !== null && _k !== void 0 ? _k : (_l = defaultOptions.localStorage) === null || _l === void 0 ? void 0 : _l.cryption,
                active: (_o = (_m = this._options.localStorage) === null || _m === void 0 ? void 0 : _m.useLocalStorage) !== null && _o !== void 0 ? _o : (_p = defaultOptions.localStorage) === null || _p === void 0 ? void 0 : _p.useLocalStorage,
            });
            this.DOM = new DOM(this);
            Promise.resolve(this.LocalStorage.setup()).then(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, loadFromLocalStorage(this)];
                        case 1:
                            _a.sent();
                            checkVersion(this);
                            return [2 /*return*/];
                    }
                });
            }); });
            this._initialized = true;
            if (!this._isClient) {
                this.InternalLogger.log("NexysCore: Detected that we are running NexysCore on non client side environment.");
                this.InternalLogger.log("NexysCore: Altough NexysCore is designed to run on client side, it can be used on server side as well but some features will might not work.");
            }
            // Core Init Event
            this.Events.fire("core.init");
            // Log initialization
            this.InternalLogger.log("NexysCore: Initialized", this._version, this._options);
            if (this._isClient)
                _end = performance.now();
            if (_start && _end) {
                this.LogPool.push({
                    data: {
                        type: "CORE:INIT",
                        diff: _end - _start,
                    },
                    ts: new Date().getTime(),
                    options: {
                        type: "METRIC",
                    },
                    guid: guid(),
                    path: getPagePath(this),
                });
                this.InternalLogger.log("NexysCore: Initialized in ".concat(_end - _start, "ms"));
            }
        };
        return Nexys;
    }(Core));

    return Nexys;

}));
