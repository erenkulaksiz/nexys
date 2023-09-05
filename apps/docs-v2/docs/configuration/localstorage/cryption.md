---
sidebar_position: 2
description: Cryption configuration
---

# Cryption

---

If you want to add some security to your logs on **localStorage**, you can use this option.

**Dont trust this feature. It is not a security feature.** This feature only makes your logs unreadable if anyone tries to read your client's logs.

| Option | Type | Default |
| --- | --- | --- |
| cryption | `boolean` | true |

## Example

```javascript
// This code will disable cryption feature.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    // highlight-start
    localStorage: {
      cryption: false
    }
    // highlight-end
});
```

## Example localStorage with cryption disabled

**localStorage** contains data that needs to be stored in the browser.

```json
{
  // logPool contains logs that are not sent to the server yet.
  // highlight-start
  "logPool": [
    {
      "ts": 1690845524299,
      "data": {
        "type": "LOGPOOL:SENDALL",
        "diff": 1027.699999988079
      },
      "options": {
        "type": "METRIC"
      },
      "guid": "22b1beb9-e204-0b82-5b04-af3736e6fb1f",
      "path": "/"
    },
    {
      "ts": 1690845534690,
      "data": {
        "eren": true
      },
      "guid": "320eee73-7ac1-cf86-f1cb-9372c1350c94",
      "path": "/",
      "stack": "Error\n    at Core.log (http://localhost:8080/static/js/bundle.js:40311:13)\n    at onClick (http://localhost:8080/static/js/bundle.js:60:63)\n    at HTMLUnknownElement.callCallback (http://localhost:8080/static/js/bundle.js:4108:18)\n    at Object.invokeGuardedCallbackDev (http://localhost:8080/static/js/bundle.js:4152:20)\n    at invokeGuardedCallback (http://localhost:8080/static/js/bundle.js:4209:35)\n    at invokeGuardedCallbackAndCatchFirstError (http://localhost:8080/static/js/bundle.js:4223:29)\n    at executeDispatch (http://localhost:8080/static/js/bundle.js:8367:7)\n    at processDispatchQueueItemsInOrder (http://localhost:8080/static/js/bundle.js:8393:11)\n    at processDispatchQueue (http://localhost:8080/static/js/bundle.js:8404:9)\n    at dispatchEventsForPlugins (http://localhost:8080/static/js/bundle.js:8413:7)"
    }
  ],
  // highlight-end
  // generally failed requests are stored on requests array.
  // highlight-next-line
  "requests": [],
  // lastLogUpdate is the last time that logPool is updated.
  // highlight-next-line
  "lastLogUpdate": 1690845534690,
  // API objects contains last response from the server that contained API information.
  // highlight-start
  "API": {
    "client": {
      "latestVersion": "1.0.3",
      "softVersion": "1.0.0",
      "hardVersion": "1.0.0"
    },
    "server": {
      "version": "1.0.0",
      "dashboard": "1.0.0"
    },
    "logUsage": 42,
    "logUsageLimit": 2000
  }
  // highlight-end
}
```