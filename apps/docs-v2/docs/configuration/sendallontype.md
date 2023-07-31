---
sidebar_position: 5
description: Send All On Type configuration
---

# Send All On Type

---

You might not want **logPool** for all of your logs. You can use `sendAllOnType` to send all of your logs on a specific type.

If there is an error on your application, you don't want to wait for the next logPool to send it.

Logs start with **AUTO:** prefix are automatically catched by **Nexys** and should be inside **sendAllOnType** configuration.

| Option | Type | Default |
| --- | --- | --- |
| sendAllOnType | `string` `string[]` `false` | ["AUTO:ERROR", "AUTO:UNHANDLEDREJECTION", "ERROR"] |

```javascript
// This code will send all logs on logPool to our servers when an error occurs.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    // highlight-next-line
    sendAllOnType: ["ERROR", "FATAL", "PURCHASE_ERROR"]
});
```

Want only one type to be sent immediately?:

```javascript
// This code will send all logs on logPool matched with "ERROR" type.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    // highlight-next-line
    sendAllOnType: "ERROR"
});
```

Want to disable **sendAllOnType**?:

```javascript
// This code will disable sendAllOnType feature.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    // highlight-next-line
    sendAllOnType: false
});
```