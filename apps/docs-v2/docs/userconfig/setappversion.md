---
sidebar_position: 2
title: Set App Version
---

# Set App Version

---

You can set the client version of your application with this method. This method will be used to identify the version of your application. This feature is crucial if you want to track the version of your application with the logs.

```ts title="pages/_app.tsx"
...
import { version } from "@/utils";

nexys.configure((config) => config.setAppVersion(version));
...
```