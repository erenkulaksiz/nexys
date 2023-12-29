---
sidebar_position: 10
description: Click Track
---

# Click Track

---

:::caution

This is an clientside feature. If you want to disable this feature, you can use [clickTrack](#clickTrack) option.

:::

This option enables or disables the click track feature. When enabled, the click track feature will track the user's click on HTML document. This feature enables you to find errors based on user's clicking. May be useful if your any elements are faulty. This feature is enabled by default.

| Option | Type | Default |
| --- | --- | --- |
| clickTrack | `boolean` | `true` |

## Example

```javascript
// This code will set clickTrack to false.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME",
    // highlight-next-line 
    clickTrack: false 
});
```


