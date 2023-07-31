---
sidebar_position: 3
description: App name configuration
---

# App Name (required)

---

This option is required. It is used to identify your application in **Nexys** dashboard. You enter **appName** while creating a new project in **Nexys** dashboard and this name need to be unique.

| Option | Type | Default |
| --- | --- | --- |
| appName | `string` | "" |

```javascript            
const nexys = new Nexys(
  "API_KEY", 
  // highlight-next-line
  { appName: "APP_NAME" }
);
```


