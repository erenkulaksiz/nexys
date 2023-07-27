---
sidebar_position: 1
---

# Introduction

---

<p align="center">
  <img src="https://imgur.com/DxcGlDs.png" width="400" />
</p>
<p align="center">
  <span>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg" />
  </span>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/nexys">
    <img src="https://nodei.co/npm/nexys.png?downloads=true" align="center" />
  </a>
</p>

🚧 This project is under development 🚧
I dont recommend you to use it in production yet.

**Nexys** is a logging service that will enable to review your errors, metrics and much more in production applications.
**Nexys** will gather all device data automatically (screen size, user agent, device memory, language, connection type, geolocation if permitted, etc.)
Also, **Nexys** will gather all errors on your production application, reports them to dashboard automatically.
You can examine each error and log's stack trace, which file it occurred and many more details.

We currently support **NextJS**, **React** and **NodeJS** platforms.

**Nexys** collects your client's data by how you configured it. Nexys is highly customizable and can be configured to collect any data you want. You can collect user data, or you can send them anonymously, or you can send them both. **Nexys** is a **privacy-first** analytics platform, and we don't collect any data from your users without your permission.

## Focus on your product

We know that you want to focus on your product and not on analytics. That's why we made **Nexys** as simple as possible. You can integrate **Nexys** with your product in less than 5 minutes. You can use our [Javascript SDK](/docs/installation).

## Logpool

While building **Nexys**, we also thinked about performance of your application, removing unneccesary requests to our servers. That's why we created **Logpool**. Logpool is a local storage for your logs. It will store your logs in your user's browser and send them to our servers in batches. You can also disable Logpool if you want to send your logs to our servers immediately.

### Example:

Let's say you configure **Nexys** like this.
  
```javascript
// This will send your logs to our servers after 10 logs on logPool has been collected.
const nexys = new Nexys("API_KEY", { appName: "APP_NAME", logPoolSize: 10 });
```

After 10 logs are collected, Nexys will send them to our servers. If you want to disable logPool, you can do it like this.

```javascript
// This will send your logs to our servers immediately (not recommended)
const nexys = new Nexys("API_KEY", { appName: "APP_NAME", logPoolSize: 1 });
```

Configure your logPool size [here](/docs/configuration/logpoolsize).

## localStorage

Logpool uses **localStorage** by default. You can also disable **localStorage** option if you don't want to store your logs in your user's browser. Also, **localStorage** is not supported on server-side code, therefor Nexys will automatically detect if you are using **localStorage** on server-side code and disable it.

```javascript
// This will disable localStorage.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    localStorage: {
      useLocalStorage: false
    }
});
```

## Send all logs on errors

We introduce log types, which you can differentiate between logs. You can also configure Nexys to send all logs on errors. This will send all logs on logPool to our servers when an error occurs.

- **Default:** `["AUTO:ERROR", "AUTO:UNHANDLEDREJECTION", "ERROR"]`

```javascript
// This will send all logs on logPool to our servers when an error occurs.
const nexys = new Nexys("API_KEY", { 
    appName: "APP_NAME", 
    sendAllOnType: ["ERROR", "FATAL", "PURCHASE_ERROR"]
});
```

Configure your **sendAllOnType** [here](/docs/configuration/sendallontype).

Theres alot more configuration options. You can check them out on [configuration](/docs/category/configuration) page.