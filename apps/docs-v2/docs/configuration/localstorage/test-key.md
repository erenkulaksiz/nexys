---
sidebar_position: 4
description: Test key configuration
---

# Test Key

---

:::caution

This is an clientside feature.

:::

**Nexys** localStorage availability is checked with a test key. You can change this key with `testKey` option.

| Option | Type | Default |
| --- | --- | --- |
| testKey | `string` | "\__nex-t__" |

## Example

```javascript
// This code will change the test key on localStorage.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    // highlight-start
    localStorage: {
      testKey: "myAppTest"
    }
    // highlight-end
});
```