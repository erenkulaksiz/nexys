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
    <img src="https://nodei.co/npm/nexys.png?downloads=true" align="center" />
  </span>
</p>

<h1 align="center">Nexys</h1>

🚧 This project is under development 🚧
I dont recommend you to use it in production yet.

Nexys is a logging service that will enable to review your errors, metrics and much more in production applications.\
Nexys will gather all device data automatically (screen size, user agent, device memory, language, connection type and geolocation if permitted)\
Also, Nexys will gather all errors on your production application, reports them to dashboard automatically.\
You can examine each error and log's stack trace, which file it occurred and many more details.

We currently support NextJS and React platforms. We will support NodeJS and React Native soon.

# Let's get you started!

### Install Nexys Client Library with npm

```bash
npm install nexys
```

### Import Nexys to your project

```javascript
import Nexys from "nexys";
```

### Then initialize Nexys

```javascript
const nexys = new Nexys("API_KEY", { appName: "APP_NAME" });
nexys.log("and start logging!");
```

### Throw an error to see automatic error handling

```javascript
throw new Error("I should be able to see this error on dashboard");
```

# Documentation

[View Nexys documentation here](https://docs.nexys.app)

# Changelog (client library)

- 1.0.3 - i forgot what i did but i added alot of new features - 27.01.2023
- 1.0.2 - connected to dashboard - 25.01.2023
- 1.0.1 - some fixes and features - 14.01.2023
- 1.0.0 - initial release - 13.01.2023
