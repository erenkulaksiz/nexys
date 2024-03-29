---
sidebar_position: 9
description: Allow geo location configuration
---

# Allow Geo Location

---

:::caution

This is an clientside feature. If you want to disable this feature, you can use [allowGeoLocation](#allowGeoLocation) option.

:::

If you want to send geo location with your logs, you can use this option. You can view each **batch**'s geo location by clicking **View Batch** on any log inside the [Nexys dashboard](https://dash.nexys.app).

Trying to enable this feature will ask user for permission to access their location. If user denies the permission, this feature will be disabled.

Default is `false` because this feature ask's user for permission to access their location.

| Option | Type | Default |
| --- | --- | --- |
| allowGeoLocation | `boolean` | false |

## Example

```javascript
// This code will enable geo location feature.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    // highlight-next-line
    allowGeoLocation: true
});
```