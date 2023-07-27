---
sidebar_position: 4
description: LogPoolSize configuration
---

# LogPool Size

---

LogPool is a buffer that stores your logs before sending them to the server. You can set the size of the **logPool** with `logPoolSize` option.

- **Option:** `logPoolSize` 
- **Type:** `number`
- **Default:** `5`

```javascript
// This code will set logPoolSize to 10
const nexys = new Nexys("API_KEY", { appName: "APP_NAME", logPoolSize: 10 });
```
