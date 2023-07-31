---
sidebar_position: 4
description: Test key configuration
---

# Test Key

---

**Nexys** localStorage availability is checked with a test key. You can change this key with `testKey` option.

| Option | Type | Default |
| --- | --- | --- |
| testKey | `string` | "\__nexysTest__" |

```javascript
// This code will disable local storage feature.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    // highlight-start
    localStorage: {
      testKey: false
    }
    // highlight-end
});
```