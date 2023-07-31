---
sidebar_position: 7
description: Allow device data configuration
---

# Allow Device Data

---

If you want to send device data with your logs, you can use this option. You can view each **batch**'s device data by clicking **View Batch** on any log inside the [Nexys dashboard](https://dash.nexys.app).

| Option | Type | Default |
| --- | --- | --- |
| allowDeviceData | `boolean` | true |

```javascript
// This code will disable device data feature.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME",
    // highlight-next-line
    allowDeviceData: false 
});
```

This feature will send these following data to dashboard:

- **Platform**
- **Language**
- **Vendor**
- **Device Memory** (up to 8GB)
- **Device Model**
- **User Agent**
- **Screen Resolution**
- **Battery Data**
- **Connection** (Wifi, Cellular)