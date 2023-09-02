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
            var _b, _c;
            var headers = _a.headers, data = _a.data;
            return __awaiter$4(this, void 0, void 0, function () {
                var server;
                var _this = this;
                return __generator$4(this, function (_d) {
                    if (!this.checkAvailability())
                        throw new Error("fetch is not defined (node environment)");
                    if (this._sendingRequest) {
                        throw new Error("API:ALREADY_SENDING");
                    }
                    this._sendingRequest = true;
                    (_c = (_b = this.core.Events.on.request).sending) === null || _c === void 0 ? void 0 : _c.call(_b, data);
                    server = "".concat(this._server, "/api/report/").concat(this._apiKey, "/").concat(this._appName);
                    this.core.InternalLogger.log("API: Sending request to server", server);
                    return [2 /*return*/, fetch(server, {
                            method: "POST",
                            headers: __assign$5({ "Content-Type": "application/json" }, headers),
                            body: JSON.stringify(data),
                        }).then(function (res) { return __awaiter$4(_this, void 0, void 0, function () {
                            var json;
                            var _a, _b;
                            return __generator$4(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        json = null;
                                        _c.label = 1;
                                    case 1:
                                        _c.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, res.json()];
                                    case 2:
                                        json = _c.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _c.sent();
                                        json = null;
                                        throw new Error("API:FAILED:JSON_PARSE_ERROR");
                                    case 4:
                                        if (res === null || res === void 0 ? void 0 : res.ok) {
                                            this.requestCompleted();
                                            (_b = (_a = this.core.Events.on.request).success) === null || _b === void 0 ? void 0 : _b.call(_a, { res: res, json: json });
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
            this.on = {
                error: null,
                unhandledRejection: null,
                logAdd: null,
                logsClear: null,
                requestsClear: null,
                coreInit: null,
                process: null,
                request: {
                    sending: null,
                    success: null,
                    error: null,
                },
                requestAdd: null,
                localStorageInit: null,
            };
            this.core = core;
            if ((_c = (_b = (_a = this.core) === null || _a === void 0 ? void 0 : _a._options) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c.allowAutomaticHandling) {
                this.setupEventHandlers();
                this.bindErrorEvents();
            }
        }
        Events.prototype.bindErrorEvents = function () {
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
                        typeof _this.on.error == "function" && _this.on.error(event);
                        return true;
                    });
                    window.addEventListener("unhandledrejection", function (event) {
                        event.stopImmediatePropagation();
                        typeof _this.on.unhandledRejection == "function" &&
                            _this.on.unhandledRejection(event);
                        return true;
                    });
                    window.addEventListener("unload", function (event) {
                        _this.core.InternalLogger.log("Events: Received unload event", event);
                    });
                    this._bindedErrorEvent = true;
                    this.core.InternalLogger.log("Events: Binded error events.");
                }
                catch (err) {
                    this.core.InternalLogger.log("Events: Couuldnt bind error event.", err);
                }
                return;
            }
            this.core.InternalLogger.log("Events: Couldnt bind error event. Not client.");
        };
        Events.prototype.setupEventHandlers = function () {
            var _this = this;
            this.on.error = function (event) {
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
                    ts: new Date().getTime(),
                    options: {
                        type: "AUTO:ERROR",
                    },
                    guid: guid(),
                    path: getPagePath(_this.core),
                });
            };
            this.on.unhandledRejection = function (event) {
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
                    ts: new Date().getTime(),
                    options: {
                        type: "AUTO:UNHANDLEDREJECTION",
                    },
                    guid: guid(),
                    path: getPagePath(_this.core),
                });
            };
            this.on.request.success = function (event) {
                _this.core.InternalLogger.log("Events: Received request success: ", event);
            };
            this.on.request.error = function (event) {
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
            };
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
        return __awaiter$3(this, void 0, void 0, function () {
            var config, deviceData, CollectData, nextJSData, vercelEnv, DOMData;
            return __generator$3(this, function (_b) {
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
                            options: __assign$3(__assign$3({}, core._options), { logPoolSize: core._logPoolSize, allowDeviceData: core._allowDeviceData, sendAllOnType: core._sendAllOnType, ignoreType: core._ignoreType, ignoreTypeSize: core._ignoreTypeSize }),
                            env: {
                                type: core._env,
                                isClient: core._isClient,
                            },
                        };
                        if (config) {
                            CollectData = __assign$3(__assign$3({}, CollectData), { config: config });
                        }
                        nextJSData = collectNextJSData();
                        if (nextJSData) {
                            CollectData = __assign$3(__assign$3({}, CollectData), { env: __assign$3(__assign$3({}, CollectData.env), nextJSData) });
                        }
                        vercelEnv = collectVercelEnv();
                        if (vercelEnv) {
                            CollectData = __assign$3(__assign$3({}, CollectData), { env: __assign$3(__assign$3({}, CollectData.env), vercelEnv) });
                        }
                        if (core._isClient) {
                            if (document && "getElementById" in document && core._allowElementData) {
                                DOMData = collectDOMData();
                                if (DOMData) {
                                    CollectData = __assign$3(__assign$3({}, CollectData), { env: __assign$3(__assign$3({}, CollectData.env), DOMData) });
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
    var version = "1.0.33";

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
     * @class LocalStorage
     * @description This class is used to handle internal localStorage operations.
     */
    var LocalStorage = /** @class */ (function () {
        function LocalStorage(core, _a) {
            var key = _a.key, testKey = _a.testKey, isEncrypted = _a.isEncrypted, active = _a.active;
            this._localStorage = null;
            this.isActive = false;
            this.isEncrypted = false;
            this.isAvailable = false;
            this.key = "__nexys__";
            this.testKey = "__nexysTest__";
            this.shouldUseLocalStorage = false;
            this.core = core;
            this._localStorage = this.core._isClient ? window === null || window === void 0 ? void 0 : window.localStorage : null;
            this.key = key;
            this.testKey = testKey;
            this.isEncrypted = isEncrypted;
            this.isActive = active;
            this.isAvailable = this.checkAvailability();
            this.core.InternalLogger.log("LocalStorage: Available:", this.isAvailable);
            if (this.isActive) {
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
            }
            this.init();
        }
        LocalStorage.prototype.init = function () {
            var _a, _b;
            if (!this.shouldUseLocalStorage)
                return;
            this.core.InternalLogger.log("LocalStorage: Initializing...");
            var localItem = this.get();
            if (localItem) {
                this.core.InternalLogger.log("LocalStorage: Found local item:", localItem);
            }
            else {
                this.core.InternalLogger.log("LocalStorage: No local item found.");
                localItem = this.resetLocalValue();
            }
            (_b = (_a = this.core.Events.on).localStorageInit) === null || _b === void 0 ? void 0 : _b.call(_a, localItem);
        };
        LocalStorage.prototype.checkAvailability = function () {
            // Check if we have localStorage object.
            if (typeof this._localStorage === "undefined")
                return false;
            try {
                localStorage.setItem(this.testKey, this.testKey);
                localStorage.removeItem(this.testKey);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        // Returns any since item can be anything
        LocalStorage.prototype.get = function () {
            var _a;
            if (!this.shouldUseLocalStorage)
                return null;
            var localItem = null;
            var parsed = null;
            try {
                localItem = (_a = this === null || this === void 0 ? void 0 : this._localStorage) === null || _a === void 0 ? void 0 : _a.getItem(this.key);
                if (!localItem) {
                    return null;
                }
            }
            catch (e) {
                return null;
            }
            if (this.isEncrypted) {
                // Decode with Base64.
                try {
                    localItem = Base64.decode(localItem);
                }
                catch (e) {
                    this.clear(); // Clear localStorage so we can start fresh.
                    return null;
                }
            }
            try {
                parsed = JSON.parse(localItem);
            }
            catch (e) {
                this.clear(); // Clear localStorage so we can start fresh.
                return null;
            }
            return parsed;
        };
        LocalStorage.prototype.set = function (value) {
            var _a;
            if (!this.shouldUseLocalStorage)
                return;
            var localItem = value;
            try {
                localItem = JSON.stringify(localItem);
            }
            catch (e) {
                return;
            }
            if (this.isEncrypted) {
                // Encode with Base64.
                try {
                    localItem = Base64.encode(localItem);
                }
                catch (e) {
                    return;
                }
            }
            try {
                (_a = this === null || this === void 0 ? void 0 : this._localStorage) === null || _a === void 0 ? void 0 : _a.setItem(this.key, localItem);
            }
            catch (e) {
                return;
            }
        };
        // This function overrides specified values.
        LocalStorage.prototype.setOverride = function (value) {
            if (!this.shouldUseLocalStorage)
                return;
            var localValue = this.get();
            var merged = Object.assign({}, value, localValue);
            this.set(merged);
        };
        LocalStorage.prototype.clear = function () {
            var _a;
            if (!this.shouldUseLocalStorage)
                return;
            this.core.InternalLogger.log("LocalStorage: Clearing everything.");
            (_a = this === null || this === void 0 ? void 0 : this._localStorage) === null || _a === void 0 ? void 0 : _a.clear();
        };
        LocalStorage.prototype.clearLogPool = function () {
            if (!this.shouldUseLocalStorage)
                return;
            var localValue = this.get();
            if (!localValue) {
                this.core.InternalLogger.log("LocalStorage: Local value is null in clearLogPool.");
                this.resetLocalValue();
                return;
            }
            localValue.logPool = [];
            this.set(localValue);
        };
        LocalStorage.prototype.clearRequests = function () {
            if (!this.shouldUseLocalStorage)
                return;
            var localValue = this.get();
            if (!localValue) {
                this.core.InternalLogger.log("LocalStorage: Local value is null in clearRequests.");
                this.resetLocalValue();
                return;
            }
            localValue.requests = [];
            this.set(localValue);
        };
        LocalStorage.prototype.addToLogPool = function (_a) {
            var data = _a.data, options = _a.options, guid = _a.guid, path = _a.path, stack = _a.stack;
            if (!this.shouldUseLocalStorage)
                return;
            var localValue = this.get();
            if (!localValue) {
                this.core.InternalLogger.log("LocalStorage: Local value is null in addToLogPool.");
                this.resetLocalValue();
                // Resets and pushes first log.
                localValue = {
                    logPool: [
                        { ts: new Date().getTime(), data: data, options: options, guid: guid, path: path, stack: stack },
                    ],
                    requests: [],
                    lastLogUpdate: new Date().getTime(),
                };
                this.set(localValue);
                return;
            }
            localValue.logPool.push({
                ts: new Date().getTime(),
                data: data,
                options: options,
                guid: guid,
                path: path,
                stack: stack,
            });
            localValue.lastLogUpdate = new Date().getTime();
            this.set(localValue);
        };
        LocalStorage.prototype.addToRequest = function (_a) {
            var res = _a.res, status = _a.status, ts = _a.ts, guid = _a.guid;
            if (!this.shouldUseLocalStorage)
                return;
            var localValue = this.get();
            if (!localValue) {
                this.core.InternalLogger.log("LocalStorage: Local value is null in addToRequest.");
                this.resetLocalValue();
                // Resets and pushes first log.
                localValue = {
                    logPool: [],
                    requests: [{ res: res, status: status, ts: ts, guid: guid }],
                    lastLogUpdate: 0,
                };
                this.set(localValue);
                return;
            }
            localValue.requests.push({ res: res, status: status, ts: ts, guid: guid });
            this.set(localValue);
        };
        LocalStorage.prototype.getLocalLogs = function () {
            if (!this.shouldUseLocalStorage)
                return null;
            var localValue = this.get();
            if (!localValue) {
                this.core.InternalLogger.log("LocalStorage: Local value is null in getLocalLogs.");
                return this.resetLocalValue().logPool;
            }
            return localValue === null || localValue === void 0 ? void 0 : localValue.logPool;
        };
        LocalStorage.prototype.getLocalRequests = function () {
            if (!this.shouldUseLocalStorage)
                return null;
            var localValue = this.get();
            if (!localValue) {
                this.core.InternalLogger.log("LocalStorage: Local value is null in getLocalRequests.");
                return this.resetLocalValue().requests;
            }
            return localValue === null || localValue === void 0 ? void 0 : localValue.requests;
        };
        LocalStorage.prototype.resetLocalValue = function () {
            this.core.InternalLogger.log("LocalStorage: Resetting local value in resetLocalValue.");
            var val = {
                logPool: [],
                requests: [],
                lastLogUpdate: 0,
            };
            this.set(val);
            return val;
        };
        LocalStorage.prototype.setAPIValues = function (value) {
            if (!this.shouldUseLocalStorage)
                return;
            var localValue = this.get();
            if (!localValue) {
                this.core.InternalLogger.log("LocalStorage: Local value is null in setAPIValue.");
                this.resetLocalValue();
                localValue = this.get();
                return;
            }
            localValue.API = value;
            this.set(localValue);
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
    var LogPool = /** @class */ (function () {
        function LogPool(core) {
            // All logs stored here.
            this.logs = [];
            this.requests = [];
            this.core = core;
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
            var _b, _c;
            var data = _a.data, options = _a.options, ts = _a.ts, guid = _a.guid, path = _a.path, stack = _a.stack;
            var log = {
                data: data,
                options: options,
                ts: ts,
                guid: guid,
                path: path,
                stack: stack,
            };
            this.logs.push(log);
            this.process();
            (_c = (_b = this.core.Events.on).logAdd) === null || _c === void 0 ? void 0 : _c.call(_b, log);
            this.core.LocalStorage.addToLogPool(log);
        };
        LogPool.prototype.pushRequest = function (_a) {
            var _b, _c;
            var res = _a.res, status = _a.status, ts = _a.ts, guid = _a.guid;
            var req = {
                res: res,
                status: status,
                ts: ts,
                guid: guid,
            };
            this.core.InternalLogger.log("LogPool: Pushing request to requests array.", req);
            this.requests.push(req);
            (_c = (_b = this.core.Events.on).requestAdd) === null || _c === void 0 ? void 0 : _c.call(_b, req);
            this.core.LocalStorage.addToRequest(req);
        };
        LogPool.prototype.clearLogs = function () {
            var _a, _b;
            this.logs = [];
            this.core.LocalStorage.clearLogPool();
            (_b = (_a = this.core.Events.on).logsClear) === null || _b === void 0 ? void 0 : _b.call(_a);
            this.core.InternalLogger.log("LogPool: Cleared logs.");
        };
        LogPool.prototype.clearRequests = function () {
            var _a, _b;
            this.requests = [];
            this.core.LocalStorage.clearRequests();
            (_b = (_a = this.core.Events.on).requestsClear) === null || _b === void 0 ? void 0 : _b.call(_a);
            this.core.InternalLogger.log("LogPool: Cleared requests.");
        };
        /**
         * Process internal data to determine whether or not we should need to send data to the server.
         */
        LogPool.prototype.process = function () {
            var _this = this;
            var _a, _b, _c, _d;
            this.core.InternalLogger.log("LogPool: Processing logs...");
            if (this.logs.length > 0 && this.core._logPoolSize != 0) {
                var sendAllOnType = this.core._sendAllOnType;
                if (!sendAllOnType)
                    return;
                // Check if sendAllOnType is array or string.
                if (Array.isArray(sendAllOnType)) {
                    // Array
                    for (var i = 0; i < this.logs.length; i++) {
                        var log = this.logs[i];
                        if (!((_a = log === null || log === void 0 ? void 0 : log.options) === null || _a === void 0 ? void 0 : _a.type))
                            continue;
                        if (this.core.API._sendingRequest)
                            continue;
                        if (sendAllOnType.includes(log.options.type)) {
                            this.core.InternalLogger.log("LogPool: sendAllOnType is array and log includes ".concat(log.options.type, " type."));
                            this.sendAll();
                            break;
                        }
                    }
                }
                else {
                    // String
                    for (var i = 0; i < this.logs.length; i++) {
                        var log = this.logs[i];
                        if (!((_b = log === null || log === void 0 ? void 0 : log.options) === null || _b === void 0 ? void 0 : _b.type))
                            continue;
                        if (this.core.API._sendingRequest)
                            continue;
                        if (log.options.type == sendAllOnType) {
                            this.core.InternalLogger.log("LogPool: sendAllOnType is string and log is ".concat(log.options.type, " type."));
                            this.sendAll();
                            break;
                        }
                    }
                }
            }
            var logsLength = 0;
            if (this.core._ignoreType !== false) {
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
                var diffLength = this.logs.length - logsLength;
                if (diffLength > this.core._ignoreTypeSize) {
                    this.core.InternalLogger.log("LogPool: diffLength (this.logs.length - logsLength): ".concat(diffLength, " ignoreTypeSize: ").concat(this.core._ignoreTypeSize, " - Ignored logs max reached."));
                    logsLength += diffLength;
                }
                else {
                    this.core.InternalLogger.log("LogPool: Ignoring ".concat(diffLength, " logs. ignoreType: ").concat(this.core._ignoreType, " ignoreTypeSize: ").concat(this.core._ignoreTypeSize));
                }
            }
            if (logsLength < this.core._logPoolSize) {
                this.core.InternalLogger.log("LogPool: logPoolSize is ".concat(this.core._logPoolSize, " but logs length is ").concat(logsLength));
                return;
            }
            if (this.core.API._sendingRequest) {
                this.core.InternalLogger.log("LogPool: Already sending request to the server.");
                return;
            }
            (_d = (_c = this.core.Events.on).process) === null || _d === void 0 ? void 0 : _d.call(_c);
            this.sendAll();
        };
        /**
         * Sends all data on Nexys to the server.
         */
        LogPool.prototype.sendAll = function () {
            return __awaiter$2(this, void 0, void 0, function () {
                var _start, _end, CollectData;
                var _this = this;
                return __generator$2(this, function (_a) {
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
                            CollectData = __assign$2(__assign$2({}, CollectData), { logs: this.logs, requests: this.requests });
                            this.core.API.sendRequest({
                                data: CollectData,
                            })
                                .then(function (res) {
                                var _a, _b;
                                var data = res.json.data;
                                _this.core.LocalStorage.setAPIValues(data);
                                _this.core.InternalLogger.log("API: Successful request", res);
                                (_b = (_a = _this.core.Events.on.request).success) === null || _b === void 0 ? void 0 : _b.call(_a, res);
                                _this.clearRequests();
                                _this.clearLogs();
                                if (_this.core._isClient)
                                    _end = performance.now();
                                if (_start && _end) {
                                    _this.core.LogPool.push({
                                        data: {
                                            type: "LOGPOOL:SENDALL",
                                            diff: _end - _start,
                                        },
                                        ts: new Date().getTime(),
                                        options: {
                                            type: "METRIC",
                                        },
                                        guid: guid(),
                                        path: getPagePath(_this.core),
                                    });
                                    _this.core.InternalLogger.log("API: Request took ".concat(_end - _start, "ms."));
                                }
                            })
                                .catch(function (err) {
                                var _a, _b;
                                _this.core.InternalLogger.error("API: Request failed.", err);
                                (_b = (_a = _this.core.Events.on.request).error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
                                if ((err === null || err === void 0 ? void 0 : err.message) == "API:FAILED:400:api-key") {
                                    _this.core.InternalLogger.error("API: Your API key is not valid. Please make sure you entered correct credentials.");
                                }
                                if ((err === null || err === void 0 ? void 0 : err.message) !== "API:ALREADY_SENDING") {
                                    _this.core.API.requestCompleted();
                                    _this.pushRequest({
                                        res: {
                                            message: err.message,
                                            stack: err.stack,
                                        },
                                        status: "failed",
                                        ts: new Date().getTime(),
                                        guid: guid(),
                                    });
                                }
                            });
                            return [2 /*return*/];
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
    var Device = /** @class */ (function () {
        function Device(core) {
            this._isAvailable = false;
            this.core = core;
            this._isAvailable = this.core._isClient && this.checkAvailability();
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
            return __awaiter$1(this, void 0, void 0, function () {
                var _this = this;
                return __generator$1(this, function (_a) {
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
            return __awaiter$1(this, void 0, void 0, function () {
                var battery, connection, deviceData, geo;
                return __generator$1(this, function (_a) {
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
                            deviceData = __assign$1(__assign$1({}, deviceData), { geo: geo });
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
    function loadFromLocalStorage(core) {
        var _a, _b, _c, _d;
        // Load logs from localStorage
        var localLogs = core.LocalStorage.getLocalLogs();
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
        // Load requests from localStorage
        var localRequests = core.LocalStorage.getLocalRequests();
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
    var defaultOptions = {
        // NexysOptions
        localStorage: {
            useLocalStorage: true,
            cryption: true,
            key: "__nexysLogPool__",
            testKey: "__nexysTest__",
        },
        errors: {
            allowAutomaticHandling: true, // Used for automatic exception handling.
        },
    };
    var Core = /** @class */ (function () {
        // Core
        function Core(API_KEY, options) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
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
            this._internalMetrics = [];
            var _start = null, _end = null;
            if (this._isClient)
                _start = performance.now();
            // Options
            this._options = __assign(__assign({}, options), { localStorage: __assign(__assign({}, this._options.localStorage), options === null || options === void 0 ? void 0 : options.localStorage), errors: __assign(__assign({}, this._options.errors), options === null || options === void 0 ? void 0 : options.errors) });
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
            if (!this._apiKey)
                throw new Error("NexysCore: API_KEY is not defined");
            if (!this._options.appName)
                throw new Error("NexysCore: Please specify appName in constructor options");
            // Internal Logger
            this.InternalLogger = new InternalLogger({
                active: (_h = (_g = this._options) === null || _g === void 0 ? void 0 : _g.debug) !== null && _h !== void 0 ? _h : false,
            });
            // LogPool
            this.LogPool = new LogPool(this);
            // Event Handler
            this.Events = new Events(this);
            // API
            this.API = new API(this, {
                server: this._server,
                apiKey: this._apiKey,
                appName: this._options.appName,
            });
            // Device
            this.Device = new Device(this);
            // LocalStorage
            this.LocalStorage = new LocalStorage(this, {
                key: (_k = (_j = this._options.localStorage) === null || _j === void 0 ? void 0 : _j.key) !== null && _k !== void 0 ? _k : (_l = defaultOptions.localStorage) === null || _l === void 0 ? void 0 : _l.key,
                testKey: (_o = (_m = this._options.localStorage) === null || _m === void 0 ? void 0 : _m.testKey) !== null && _o !== void 0 ? _o : (_p = defaultOptions.localStorage) === null || _p === void 0 ? void 0 : _p.testKey,
                isEncrypted: (_r = (_q = this._options.localStorage) === null || _q === void 0 ? void 0 : _q.cryption) !== null && _r !== void 0 ? _r : (_s = defaultOptions.localStorage) === null || _s === void 0 ? void 0 : _s.cryption,
                active: (_u = (_t = this._options.localStorage) === null || _t === void 0 ? void 0 : _t.useLocalStorage) !== null && _u !== void 0 ? _u : (_v = defaultOptions.localStorage) === null || _v === void 0 ? void 0 : _v.useLocalStorage,
            });
            loadFromLocalStorage(this);
            if (!this._isClient) {
                this.InternalLogger.log("NexysCore: Detected that we are running NexysCore on non client side environment.");
                this.InternalLogger.log("NexysCore: Altough NexysCore is designed to run on client side, it can be used on server side as well but some features will might not work.");
            }
            // Core Init Event
            (_x = (_w = this.Events.on).coreInit) === null || _x === void 0 ? void 0 : _x.call(_w);
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
        }
        /**
         * Adds log request to logPool in Nexys instance.
         *
         * @example
         * ```javascript
         * // Initialize the client and log "Hello World"
         * const nexys = new Nexys("API_KEY", { appName: "My_app" });
         * nexys.log("Hello World");
         * ```
         *
         * ```javascript
         * // Initialize the client and log "Hello World" with options
         * nexys.log("Hello World", { type: "info" });
         * ```
         *
         * @param data - Any data to be logged
         * @param options - `Optional` - Log options specified below
         * @param options.type - `Optional` - Log type
         * @param options.level - `Optional` - Log level
         * @param options.tags - `Optional` - Log tags
         * @param options.action - `Optional` - Log action
         *
         * @public
         */
        Core.prototype.log = function (data, options) {
            var e = new Error();
            this.LogPool.push({
                data: data,
                options: options,
                stack: e.stack,
                ts: new Date().getTime(),
                guid: guid(),
                path: getPagePath(this),
            });
        };
        /**
         * Adds error request to logPool in Nexys instance.
         *
         * @example
         * ```javascript
         * // Initialize the client and log "Hello World"
         * const nexys = new Nexys("API_KEY", { appName: "My_app" });
         * nexys.log("Hello World");
         * ```
         *
         * ```javascript
         * // Initialize the client and give error
         * nexys.error("I'm an error");
         * ```
         *
         * @param data - Any data to be logged
         * @param options - `Optional` - Log options specified below
         * @param options.type - `Optional` - Log type
         * @param options.level - `Optional` - Log level
         * @param options.tags - `Optional` - Log tags
         * @param options.action - `Optional` - Log action
         *
         * @public
         */
        Core.prototype.error = function (data, options) {
            var e = new Error();
            this.LogPool.push({
                data: data,
                options: __assign(__assign({}, options), { type: "ERROR" }),
                stack: e.stack,
                ts: new Date().getTime(),
                guid: guid(),
                path: getPagePath(this),
            });
        };
        /**
         * `NextJS only method`
         *  Collect metric data for NextJS for performance measuring
         *  The metric data will not affect logPoolSize on default, log types with "METRIC" is ignored by default.
         *  Data collected from metrics will be sent if any request to dashboard happens. We do not want to send metric data on each page load. This will cause your client to get rate limit blocked.
         *  We will add metric support for React soon.
         *
         * @example
         * ```javascript
         * // Initialize the client
         * const nexys = new Nexys("API_KEY", { appName: "My_app" });
         * // inside pages/_app.jsx|tsx
         * export function reportWebVitals(metric: NextWebVitalsMetric) {
         *  nexys.metric(metric);
         * }
         * ```
         *
         * @param metric Metric data that you get from calling reportWebVitals in NextJS
         */
        Core.prototype.metric = function (metric) {
            var e = new Error();
            this.LogPool.push({
                data: metric,
                options: {
                    type: "METRIC",
                },
                ts: new Date().getTime(),
                guid: guid(),
                stack: e.stack,
                path: getPagePath(this),
            });
        };
        /**
         * Configures Nexys instance. All logs sent to Nexys will use these configurations.
         * This method will help you trough identifying your logs where came from like which user or which device.
         *
         * @example
         * ```javascript
         * // Import and initialize the client
         * import Nexys from "nexys";
         *
         * const nexys = new Nexys("API_KEY", { appName: "My_app" });
         *
         * // Import types of config (Optional: If TypeScript is being used)
         * import type { configFunctions } from "nexys/dist/src/types";
         *
         * nexys.configure((config: configFunctions) => {
         *  // Set user
         *  config.setUser("123456789_UNIQUE_ID");
         *  // Set application version (likely to be your app version)
         *  // This config is MUST-to-do because we will analyze each of your versions
         *  config.setAppVersion("1.0.0");
         * });
         * ```
         */
        Core.prototype.configure = function (config) {
            var _this = this;
            (function () {
                return typeof config == "function" &&
                    config({
                        setUser: function (user) {
                            _this._config = __assign(__assign({}, _this._config), { user: user });
                            _this.InternalLogger.log("NexysCore: User configured", user);
                        },
                        setClient: function (client) {
                            _this._config = __assign(__assign({}, _this._config), { client: client });
                            _this.InternalLogger.log("NexysCore: Client configured", client);
                        },
                        setAppVersion: function (appVersion) {
                            _this._config = __assign(__assign({}, _this._config), { appVersion: appVersion });
                            _this.InternalLogger.log("NexysCore: App version configured", appVersion);
                        },
                    });
            })();
        };
        /**
         * This method will clear whatever stored in Nexys.
         *
         * @example
         * ```javascript
         * nexys.clear();
         * ```
         */
        Core.prototype.clear = function () {
            this.LogPool.clearLogs();
            this.LogPool.clearRequests();
        };
        /**
         * This method will force a request to Nexys.
         * Use this method if you want to send all logs to Nexys immediately.
         * This method is not recommended to use. It will cause your client to get rate limit blocked if you use it too much.
         *
         * @example
         * ```javascript
         * nexys.forceRequest();
         * ```
         */
        Core.prototype.forceRequest = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.LogPool.sendAll()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
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
         * // Initialize the client
         * const nexys = new Nexys("API_KEY", { appName: "My_app" });
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
        return Nexys;
    }(Core));

    return Nexys;

}));
