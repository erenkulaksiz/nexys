---
sidebar_position: 2
description: Ignore Type Size configuration
---

# Ignore Type Size

---

Use if you want to send all logs if ignored log type size is bigger than **ignoreTypeSize**.

- **Option:** `ignoreTypeSize` 
- **Type:** `number`
- **Default:** `50`

```javascript
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    ignoreTypeSize: 100
});
```

Making this value `0` will disable this feature.