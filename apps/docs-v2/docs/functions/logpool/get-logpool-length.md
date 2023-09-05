---
sidebar_position: 6
title: Nexys.getLogPoolLength()
---

# Nexys.getLogPoolLength()

Returns `number`.

---

Returns the current log pool length. This is useful when you want to know how many logs are currently in the log pool. This will return 0 if no logs are in the log pool.

This will not take the account of [ignoreType](/configuration/ignoretype/ignore-type).

```javascript
nexys.getLogPoolLength();
```