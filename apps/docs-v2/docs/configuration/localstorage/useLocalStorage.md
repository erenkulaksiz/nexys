---
sidebar_position: 1
description: Use Local Storage configuration
---

# Use Local Storage

---

If enabled, **Nexys** will store your logs in the browser's local storage. If the user is offline, **Nexys** will send the logs to the server when the user is online again.

- **Option:** `useLocalStorage` 
- **Type:** `boolean`
- **Default:** `true`

```javascript
// This code will disable local storage feature.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    localStorage: {
      useLocalStorage: false
    }
});
```