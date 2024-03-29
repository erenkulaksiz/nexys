---
sidebar_position: 1
description: Use Local Storage configuration
---

# Use Local Storage

---

:::caution

This is an clientside feature. If you want to disable this feature, you can use [useLocalStorage](#useLocalStorage) option.

:::

If enabled, **Nexys** will store your logs in the browser's local storage. If the user is offline, **Nexys** will send the logs to the server when the user is online again.

| Option | Type | Default |
| --- | --- | --- |
| useLocalStorage | `boolean` | true |

## Example

```javascript
// This code will disable local storage feature.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    // highlight-start
    localStorage: {
      useLocalStorage: false
    }
    // highlight-end
});
```