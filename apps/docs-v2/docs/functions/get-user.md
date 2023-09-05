---
sidebar_position: 5
title: Nexys.getUser()
---

# Nexys.getUser()

Returns `string` or `null`.

---

This will return current configured user or null if no user is configured. Learn how to configure a user [here](/userconfig/setuser).

User will be configured automatically if you are using `localStorage` and user is signed in using `setUser` configuration.

## Example

```javascript
nexys.getUser();
```