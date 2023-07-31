---
sidebar_position: 2
title: Set App Version
description: Set App Version
---

# Set App Version

---

You can set the client version of your application with this method. This method will be used to identify the version of your application. This feature is crucial if you want to track the version of your application with the logs.

```ts title="pages/_app.tsx"
...
// import version from package.json or write your own version. Should be in the format of x.x.x
import { version } from "@/utils";

// highlight-next-line
nexys.configure((config) => config.setAppVersion(version));
...
```