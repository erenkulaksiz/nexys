<img src="./logo.png" width="400" height="200" align="center" />

This library makes it easy to establish connection between your client and Nexys dashboard.

## How it works?

Nexys is a dashboard and client library that allows you to monitor your application logs and performance. It is a tool that helps you to understand how your application is performing and how it is behaving in production. You can view each user's detailed logs and performance data in a single place. Currently in beta and still being built.

Nexys will be available on these platforms soon:

- Web: React, NextJS
- Mobile: React Native
- Desktop: Electron
- Backend: NodeJS

## Installation

```bash
npm install nexys
```

## Usage

```javascript
import nexys from "nexys";
```

or you can import only the methods you need

```javascript
import { init, log } from "nexys";
```

then: 

```javascript

// init nexys
nexys.init({
    apiKey: "YOUR_API_KEY",
    app: "YOUR_APP_NAME",
    version: "YOUR_APP_VERSION",
    domain: "YOUR_APP_DOMAIN",
})

// then start logging!
nexys.log("Hello World!");

// or with tags
nexys.log("Hello, with tags!", "INFO");

// or tags with categories
nexys.log("USER 1 LOGIN", "General/Info/UserLogin");

// or send custom data
nexys.log(
    { // custom data, need to send as an object
        message: "USER 1 LOGIN", // this is important, you need to send message with a log message
        data: { // you can send any data you want, inside data object after message
            user: {
                id: 1,
                name: "John Doe",
            },
            timestamp: Date.now()
        },
    }, 
    "General/Info/UserLogin" // Tag with category
);

// More examples and documentation will be available soon.

```