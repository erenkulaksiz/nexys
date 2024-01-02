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
export function getSelector(element) {
    var _a;
    try {
        var tagName = element.tagName.toLowerCase();
        var id = element.id ? "#".concat(element.id) : "";
        var classes = element.className
            ? ".".concat(parseSelector(element.className))
            : "";
        var selector = "".concat(tagName).concat(id).concat(classes);
        if (document.querySelectorAll(selector).length === 1)
            return selector;
        var siblings = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll(selector);
        if (siblings && siblings.length > 1) {
            var index = Array.from(siblings).indexOf(element);
            selector += ":nth-child(".concat(index + 1, ")");
        }
        if (element.parentElement) {
            selector = getSelector(element.parentElement) + " " + selector;
        }
        return selector;
    }
    catch (error) {
        return "";
    }
}
function parseSelector(selector) {
    return selector
        .trim()
        .replace(/\s+/g, ".")
        .replace(/(\.(?=\d)|:|\/|\[|\]|&|-)/g, "\\$1");
}
