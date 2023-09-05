---
sidebar_position: 1
description: Allow automatic handling configuration
---

# Allow Automatic Handling

---

If enabled, Nexys will automatically handle errors and unhandled rejections and add them to the **logPool**.

| Option | Type | Default |
| --- | --- | --- |
| allowAutomaticHandling | `boolean` | true |

## Example

```javascript
// This code will disable automatic handling feature.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    // highlight-start
    errors: {
      allowAutomaticHandling: false
    }
    // highlight-end
});
```