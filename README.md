# Speedlog

This library makes easy to establish connection between your client and Speedlog dashboard.

## How it works?

Speedlog is a dashboard that allows you to monitor your application logs and performance. It is a tool that helps you to understand how your application is performing and how it is behaving in production. You can view each user's detailed logs and performance data in a single place. Currently in beta and still being built.

## Installation

```bash
npm install speedlog-client
```

## Usage

```javascript
import speedlog from 'speedlog-client';

// async function since we are sending init request
await speedlog.init({
    apiKey: 'YOUR_API_KEY',
    app: "YOUR_APP_NAME",
    version: "YOUR_APP_VERSION",
    domain: "YOUR_APP_DOMAIN",
});

// also you can use it with .then
speedlog.init({
    apiKey: 'YOUR_API_KEY',
    app: "YOUR_APP_NAME",
    version: "YOUR_APP_VERSION",
    domain: "YOUR_APP_DOMAIN",
}).then((speedlog: initSuccessReturnTypes) => {
    // do something with speedlog
    // speedlog is an object that contains all the methods you need to use
    // it also holds the authToken, apiKey, app, version and domain you've sent
}).catch((error: initErrorReturnTypes) => {
    // handle error
});

speedlog.log('Hello World!');

// or with tags to categorize logs

speedlog.log("Hello, with tags!", "ERROR");
```

or you can import only the methods you need

```javascript
import { init, log } from 'speedlog-client';
```