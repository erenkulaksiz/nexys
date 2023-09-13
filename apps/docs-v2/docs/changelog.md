---
sidebar_position: 8
title: Changelog
---

# Changelog

---

## 1.1.1

- Fixed a bug where `nexys.init()` would print wrong log on initialization.

## 1.1.0

- Added `DOM` 🚀 - Will add support to dashboard soon!
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