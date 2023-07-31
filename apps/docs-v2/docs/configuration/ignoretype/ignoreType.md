---
sidebar_position: 1
description: Ignore Type configuration
---

# Ignore Type

---

If you want to ignore some of your logs from your **logPoolSize** (like metrics), you can use `ignoreType` option.

Ignoring any type will not going to remove that log, but will not count as a log for your **logPoolSize** therefor if there is 100 ignored logs and your **logPoolSize** is 5, the ignored logs wont trigger a **logPool**.

| Option | Type | Default |
| --- | --- | --- |
| ignoreType | `string` `string[]` `false` | "METRIC" |

```javascript
// This code will ignore all logs with type "TEST" and "METRIC".
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME",
    // highlight-next-line
    ignoreType: ["TEST", "METRIC"]
});
```

Want to disable **ignoreType**?:

```javascript
// This code will disable ignoreType feature.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    // highlight-next-line
    ignoreType: false
});
```