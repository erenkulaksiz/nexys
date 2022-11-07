# Nexys

This library makes easy to establish connection between your client and Nexys dashboard.

## How it works?

Nexys is a dashboard and client library that allows you to monitor your application logs and performance. It is a tool that helps you to understand how your application is performing and how it is behaving in production. You can view each user's detailed logs and performance data in a single place. Currently in beta and still being built.

## Installation

```bash
npm install nexys
```

## Usage

```javascript
import nexys from "nexys";

// async function since we are sending init request
await nexys.init({
    apiKey: "YOUR_API_KEY",
    app: "YOUR_APP_NAME",
    version: "YOUR_APP_VERSION",
    domain: "YOUR_APP_DOMAIN",
});

// also you can use it with Promises
nexys.init({
    apiKey: "YOUR_API_KEY",
    app: "YOUR_APP_NAME",
    version: "YOUR_APP_VERSION",
    domain: "YOUR_APP_DOMAIN",
}).then((client: initSuccessReturnTypes) => {
    // do something with client object
    // client is an object that contains all the methods you need to use
    // it also holds the authToken, apiKey, app, version and domain you've sent
}).catch((error: initErrorReturnTypes) => {
    // handle error
});

nexys.log("Hello World!");

// or with tags to categorize logs

nexys.log("Hello, with tags!", "INFO");
```

or you can import only the methods you need

```javascript
import { init, log } from "nexys";
```

## Note that you need to init the client before using any other method since every request will be sent with the authToken you've received from init method. You do not need to store authToken anywhere, it is stored in the client.