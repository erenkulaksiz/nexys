---
sidebar_position: 9
title: Nexys.getLogPoolRequests()
---

# Nexys.getLogPoolRequests()

Returns `requestTypes[]`.

---

This method will return requests in logPool. Requests array will be cleared (also on localStorage) after each successful request to Nexys.

## Example

```javascript
nexys.getLogPoolRequests();
```