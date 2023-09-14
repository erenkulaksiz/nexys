---
sidebar_position: 1
title: Local Storage
description: Local Storage Adapter.
---

# Local Storage Adapter

---

:::caution

This is an clientside feature.

:::

In **Nexys**, we use `localStorage` to store logs and such data temporarily. This operation is crucial because if user refreshes the page or exits the application, data will be lost. To prevent this, we use `localStorage` to store data temporarily.

Some platforms like `React Native` and `NodeJS` doesn't have their own `localStorage` implementation, also they don't introduce `window` global object so we need to pass our own `localStorage` solution to the **Nexys**.

You probably dont want to setup adapter in `NodeJS` since it is an serverside application and it doesn't need to store data in `localStorage`. But if you want to use it in `React Native`, you need to setup it.

## Setup for React Native

[You can view React Native with adapters example here.](https://github.com/erenkulaksiz/nexys-js-example/tree/master/react-native)

First, you need to find an `AsyncStorage` library for `React Native`. We are going to use [this library](https://npmjs.com/package/react-native-storage) for the example.

```bash
npm install react-native-storage @react-native-async-storage/async-storage
```

Then, you need to create a new file called `storage.js|ts` in your project. This file will be our `localStorage` implementation for `React Native`.

```ts title="storage.ts"
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true
});

export default storage;
```

Then, you need to pass this `storage` object to the `Nexys` as an adapter.

```ts title="nexys.ts"
import Nexys from "nexys";
import storage from "./storage";

const nexys = new Nexys("API_KEY", {
  appName: "APP_NAME",
  localStorage: {
    // highlight-next-line
    useAdapter: true,
    key: "nex",
    testKey: "nex-test",
    // highlight-start
    adapter: {
      getItem: (key: string) => {
        return storage.load({key});
      },
      setItem: (key: string, value: any) => {
        return storage.save({key, data: value});
      },
      removeItem: (key: string) => {
        return storage.remove({key});
      }
    }
    // highlight-end
  }
});

export default nexys;
```

:::info

Inside the `adapter` object, you need to pass `getItem`, `setItem` and `removeItem` functions. These functions will be used by **Nexys** to store data in `localStorage`.
Please do not change the function names.

:::


And thats it! you're all set. Now you can use `Nexys` with `localStorage` in your `React Native` application.