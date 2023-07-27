---
sidebar_position: 2
description: Cryption configuration
---

# Cryption

---

If you want to add some security to your logs on **localStorage**, you can use this option.

**Dont trust this feature. It is not a security feature.** This feature only makes your logs unreadable if anyone tries to read your client's logs.

- **Option:** `cryption` 
- **Type:** `boolean`
- **Default:** `true`

```javascript
// This code will disable cryption feature.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    localStorage: {
      cryption: false
    }
});
```