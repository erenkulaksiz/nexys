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
import { Base64, isClient } from "../../utils";
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
        this._localStorage = isClient() ? window === null || window === void 0 ? void 0 : window.localStorage : null;
        this.key = key;
        this.testKey = testKey;
        this.isEncrypted = isEncrypted;
        this.isActive = active;
        this.isAvailable = this.checkAvailability();
        this.core = core;
        this.core.InternalLogger.log("LocalStorage: Available:", this.isAvailable);
        if (this.isActive) {
            this.core.InternalLogger.log("LocalStorage: Set to Active");
            // We will not going to use localStorage if library is loaded in server environment.
            this.shouldUseLocalStorage =
                this.isAvailable && this._localStorage && isClient() ? true : false;
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
        var data = _a.data, options = _a.options;
        if (!this.shouldUseLocalStorage)
            return;
        var localValue = this.get();
        if (!localValue) {
            this.core.InternalLogger.log("LocalStorage: Local value is null.");
            this.resetLocalValue();
            // Resets and pushes first log.
            localValue = {
                logPool: [{ ts: new Date().getTime(), data: data, options: options }],
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
        });
        localValue.lastLogUpdate = new Date().getTime();
        this.set(localValue);
    };
    LocalStorage.prototype.addToRequest = function (_a) {
        var res = _a.res, status = _a.status, ts = _a.ts;
        if (!this.shouldUseLocalStorage)
            return;
        var localValue = this.get();
        if (!localValue) {
            this.core.InternalLogger.log("LocalStorage: Local value is null.");
            this.resetLocalValue();
            // Resets and pushes first log.
            localValue = {
                logPool: [],
                requests: [{ res: res, status: status, ts: ts }],
                lastLogUpdate: 0,
            };
            this.set(localValue);
            return;
        }
        localValue.requests.push({ res: res, status: status, ts: ts });
        this.set(localValue);
    };
    LocalStorage.prototype.getLocalLogs = function () {
        if (!this.shouldUseLocalStorage)
            return null;
        var localValue = this.get();
        if (!localValue) {
            this.core.InternalLogger.log("LocalStorage: Local value is null.");
            this.resetLocalValue();
            return null;
        }
        return localValue === null || localValue === void 0 ? void 0 : localValue.logPool;
    };
    LocalStorage.prototype.getLocalRequests = function () {
        if (!this.shouldUseLocalStorage)
            return null;
        var localValue = this.get();
        if (!localValue) {
            this.core.InternalLogger.log("LocalStorage: Local value is null.");
            this.resetLocalValue();
            return null;
        }
        return localValue === null || localValue === void 0 ? void 0 : localValue.requests;
    };
    LocalStorage.prototype.resetLocalValue = function () {
        this.core.InternalLogger.log("LocalStorage: Resetting local value.");
        var val = {
            logPool: [],
            requests: [],
            lastLogUpdate: 0,
        };
        this.set(val);
        return val;
    };
    return LocalStorage;
}());
export { LocalStorage };
