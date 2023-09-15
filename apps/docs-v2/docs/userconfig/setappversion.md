---
sidebar_position: 2
title: Set App Version
description: Set App Version
---

# Set App Version

---

:::caution

This is an clientside feature.

:::

You can set the client version of your application with this method. This method will be used to identify the version of your application. This feature is crucial if you want to track the version of your application with the logs.

Accepts `string`.

```ts title="pages/_app.tsx"
...
// import version from package.json or write your own version. Preffered format is x.x.x
import { version } from "@/utils";

// highlight-next-line
nexys.configure((config) => config.setAppVersion(version));
...
```