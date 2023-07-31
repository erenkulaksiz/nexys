---
sidebar_position: 3
description: Key configuration
---

# Key

---

If you want to change the key of your logs on **localStorage**, you can use this option.

| Option | Type | Default |
| --- | --- | --- |
| key | `string` | "\__nexysLogPool__" |

```javascript
// This code will change the key of your logs on localStorage.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME",
    // highlight-start
    localStorage: {
      key: "myApp"
    }
    // highlight-end
});
```