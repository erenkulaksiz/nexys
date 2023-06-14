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
    <a href="https://www.npmjs.com/package/nexys">
      <img src="https://nodei.co/npm/nexys.png?downloads=true" align="center" />
    </a>
  </span>
</p>

<h1 align="center">Nexys</h1>

🚧 This project is under development 🚧

- 0 dependency 
- Consistent
- Customizable & Flexible
- Clientside & Serverside

Nexys is a logging service that will enable to review your errors, metrics and much more in production applications.\
Nexys will gather all device data automatically (screen size, user agent, device memory, language, connection type and geolocation if permitted)\
Also, Nexys will gather all errors on your production application, reports them to dashboard automatically.\
You can examine each error and log's stack trace, which file/page the error occurred and many more details.

Nexys supports NextJS, ReactJS, NodeJS and more frameworks will be supported soon.

# Let's get you started!

### Install Nexys client library with npm

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

### Want to debug? Use debug parameter on initialization

```javascript
const nexys = new Nexys("API_KEY", { appName: "APP_NAME", debug: true });
```

# Documentation

[View Nexys documentation here](https://docs.nexys.app)