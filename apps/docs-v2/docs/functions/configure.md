---
sidebar_position: 1
title: Nexys.configure()
---

# Nexys.configure()

Returns `void`.

---

Allows you to configure user data & client version. Data will be sent to dashboard on each request.

| Parameter | Type | Default |
| --- | --- | --- |
| config | `function` | undefined |

First parameter of the function takes an callback. This callback will be called with an object that contains these following properties:

| Property | Type | Default |
| --- | --- | --- |
| setUser | `string` | undefined |
| setAppVersion | `string` | undefined |

## Example

```javascript
nexys.configure((config) => {
    config.setUser("USER_ID");
    config.setAppVersion("1.0.0");
});
```

More information [here](/category/user-configuration).