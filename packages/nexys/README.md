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

- 0 dependency 
- Consistent
- Customizable & Flexible
- Clientside & Serverside

More information on [nexys.app](https://nexys.app)

# Let's get you started!

### Install Nexys client library with npm

```bash
npm install nexys
```

### Import Nexys to your project

```javascript
import Nexys from "nexys";
```

or put this on your HTML file's `<head>` tag:

```html
<script src="https://cdn.jsdelivr.net/gh/erenkulaksiz/nexys/packages/nexys/bundle.min.js"></script>
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

[View documentation here](https://docs.nexys.app)