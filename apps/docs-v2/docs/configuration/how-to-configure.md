---
sidebar_position: 1
description: How to configure Nexys
---

# How to configure

---

After you have installed and created required files, you can start configuring your **Nexys** application.

## Example

```javascript
const nexys = new Nexys("API_KEY", {
  // highlight-next-line
  appName: "APP_NAME" 
});
```

In second parameter you can pass an object with your config options.