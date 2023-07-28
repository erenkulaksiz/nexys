---
sidebar_position: 2
title: Installation
---

# Getting Started

---

## UNLOAD

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
Want configuration options? Check out the [configuration](/category/configuration) page.

## Usage

Now, you can use **Nexys** anywhere on your project. Here's an example:

```tsx title="pages/index.tsx"
import nexys from '../nexys';

export default function Home() {
  return (
    <div>
      <button onClick={() => nexys.log("Hello World!")}>Log Hello World!</button>
    </div>
  )
}
```

Calling **Nexys** anywhere on your project will automatically sets up event handlers, and other internal stuff. You don't need to worry about anything else.

Just setting up **Nexys** wont setup any handlers and will **not** track your errors.