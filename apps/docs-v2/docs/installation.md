---
sidebar_position: 2
title: Installation
---

# Getting Started

---

Get started by creating a new **HTML**, **React**, **NextJS** or **NodeJS** project.

## Install

```bash
npm install nexys
```

or 

```bash
yarn add nexys
```

or put this on your HTML file's `<head>` tag:

```html
<script src="https://unpkg.com/nexys@latest/dist/bundle.min.js"></script>
```

## Configure

First, create a new file called `nexys.ts|js` somewhere on your project. Preferably on the root of your project. Then, add the following code to the file to get started.

```ts title="nexys.ts"
import { Nexys } from "nexys";

// first parameter takes api key, second takes config options
const nexys = new Nexys(
  // highlight-next-line
  "API_KEY", 
  { 
    // highlight-next-line
    appName: "APP_NAME" 
  }
);

export default nexys;
```

and you are set! Make sure you replace `API_KEY` with your API key and `APP_NAME` with your app name. You can find your API key on your [dashboard](https://dash.nexys.app/).
Want configuration options? Check out the [configuration](/category/configuration) page.

## Initialize

To use **Nexys**, you need to initialize it. To do that, import the `nexys` file you created earlier and call the `init` method anywhere on your application.
You cant use any **Nexys** feature without initializing.

```ts title="pages/_app.tsx"
import nexys from "../nexys";

export default function MyApp({ Component, pageProps }) {
  // highlight-next-line
  nexys.init();
  return <Component {...pageProps} />
}
```


## Usage

Now, you can use **Nexys** anywhere on your project. Here's an example:

```tsx title="pages/index.tsx"
import nexys from "../nexys";

export default function Home() {
  return (
    <div>
      <button 
        onClick={() => {
          // highlight-next-line
          nexys.log("Hello World!")
        }}
      >
        Log Hello World!
      </button>
    </div>
  )
}
```