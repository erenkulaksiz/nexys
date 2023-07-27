---
sidebar_position: 2
title: Installation
---

## Getting Started

Get started by creating a new **React**, **NextJS** or **NodeJS** project.

## Install

```bash
npm install nexys
```

or 

```bash
yarn add nexys
```

## Configure

First, create a new file called `nexys.ts|js` somewhere on your project. Preferably on the root of your project. Then, add the following code to the file to get started.

```ts title="nexys.ts"
import { Nexys } from 'nexys';

// first parameter takes api key, second takes config options
// highlight-next-line
const nexys = new Nexys("API_KEY", { appName: "APP_NAME" });

export default nexys;
```

and you are set! Make sure you replace `API_KEY` with your API key and `APP_NAME` with your app name. You can find your API key on your [dashboard](https://dash.nexys.app/).
Want configuration options? Check out the [configuration](/docs/category/configuration) page.