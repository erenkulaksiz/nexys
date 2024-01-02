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

export function getSelector(element: HTMLElement) {
  try {
    const tagName = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : "";
    const classes = element.className
      ? `.${parseSelector(element.className)}`
      : "";

    let selector = `${tagName}${id}${classes}`;

    if (document.querySelectorAll(selector).length === 1) return selector;

    const siblings = element.parentElement?.querySelectorAll(selector);
    if (siblings && siblings.length > 1) {
      const index = Array.from(siblings).indexOf(element);
      selector += `:nth-child(${index + 1})`;
    }

    if (element.parentElement) {
      selector = getSelector(element.parentElement) + " " + selector;
    }

    return selector;
  } catch (error) {
    return "";
  }
}

function parseSelector(selector: string) {
  return selector
    .trim()
    .replace(/\s+/g, ".")
    .replace(/(\.(?=\d)|:|\/|\[|\]|&|-)/g, "\\$1");
}
