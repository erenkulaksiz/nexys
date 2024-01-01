---
sidebar_position: 8
title: Changelog
---

# Changelog

---

## 1.1.8

- Fixed `getSelector.ts` accuraccy issue with Tailwind CSS.
- Fixed a bug inside events, where if `allowAutomaticHandling` set to false, no events were set.

## 1.1.5

- Fixed small text in LICENSE file.
- Changed import on various file to import types of Core, not the core itself, reducing bundle size.
- Seperated events on different files: `bindEvents.ts` and `setupEventHandlers.ts` inside events directory.
- Added `getSelector.ts` to utils, featuring dynamic selector string building.
- Removed unneccesary boolean in events file.
- Added more click details such as click position and selector to click events.
- Added `getPagePath.ts` inside `utils/index.ts` to reduce the bundle size, changed imports on various files.
- Removed unneccesary comment line on `utils/index.ts`

## 1.1.4

- Changed API URL from `https://dash.nexys.app` to `https://api.nexys.dash`.
- Added `clickTrack` feature. If enabled, Nexys will track user's clicks on HTML document.
- Added `clickTrack` option to enable/disable this feature inside configuration.

## 1.1.3

- No comments for this one.

## 1.1.2

- Removed `DOM` from `Nexys`.

## 1.1.1

- Fixed a bug where `nexys.init()` would print wrong log on initialization.
- Removed `bundle.min.js` from `dist` folder.
- Added `setPlatform` function to `nexys.configure()`.
- Platform and App Version now loads automatically from `localStorage` on `nexys.init()`.
- Removed `clear()` from `localStorage` adapter.

## 1.1.0

- Added `DOM` 🚀
- Added `visibility.change` event.

## 1.0.39

- Events reworked: `subscribe`, `unsubscribe` and `fire` functions added.
- Added `nexys.init()` function.
- Fixed a bug where `ignoreType` config was not working properly.

## 1.0.38

- Fixed bug where setting `useLocalStorage` to false would use `localStorage` anyway.
- Fixed bug where configuring user would not save it to `localStorage` if `useLocalStorage` is set to `true`.
- Fixed an issue in HTML example.
- Added functions `getLibraryVersion`, `getUser`, `getLogPoolLength`, `getLogPoolLogTypes`, `getLogPoolLogs`, `getLogPoolRequests`, `getApiValues`, `getIsInitialized`, `getDeviceData`
- Added functions to the docs as well as other functions that were not documented.

## 1.0.37

- Added `localStorage` adapter to `Nexys` core.

## 1.0.36

- Added feature that configuring an user will automatically save it to `localStorage`.
- Added feature that if `localStorage` user is found, it will be used as default user.
- Added new core functions: `getUser` - `getLibraryVersion`.
- Nexys library is now: **ES5** compatible!
- Changed default `localStorage` key to `__nex__`. Test key is also changed to `__nex-t__`
- Added version checking to internals.

## 1.0.35

- Added UMD support, now you can use Nexys on your browser without any bundler.
- Fixed various docs typos.