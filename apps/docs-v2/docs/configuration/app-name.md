---
sidebar_position: 3
description: App name configuration
---

# App Name (required)

---

This option is required. It is used to identify your application in **Nexys** dashboard. You enter **appName** while creating a new project in Nexys dashboard and this name need to be unique.

- **Option:** `appName` 
- **Type:** `string`
- **Default:** `""`

```javascript            
const nexys = new Nexys("API_KEY", { appName: "APP_NAME" });
                                              /*^^^^^^^*/
```


