---
sidebar_position: 3
title: Nexys.forceRequest()
---

# Nexys.forceRequest()

Returns `Promise<void>`.

---

Forces a request to be sent to the server. This is useful when you want to send a request to the server without waiting for the next logPoolSize to be reached. Use this function with caution as it can cause performance issues/rate limit issues if used incorrectly.

## Example

```javascript
nexys.forceRequest();
```