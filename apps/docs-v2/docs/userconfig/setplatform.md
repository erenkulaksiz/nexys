---
sidebar_position: 3
title: Set Platform
description: Set Platform
---

# Set Platform

---

You can set the platform of your application with this method. This method will be used to identify the platform of your application. This feature is crucial if you want to track the platform of your application with the logs.

Accepts `string`.

```ts title="pages/_app.tsx"
...
nexys.configure((config) => config.setPlatform(...));
...
```