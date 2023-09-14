---
sidebar_position: 2
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started

---

Get started by creating a new **HTML**, **React**, **NextJS** or **NodeJS** project.

## Install

<Tabs>
<TabItem value="npm" label="npm" default>

```bash
npm install nexys
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn add nexys
```

</TabItem>
<TabItem value="javascript" label="javascript">

```html
<script src="https://cdn.jsdelivr.net/gh/erenkulaksiz/nexys/packages/nexys/bundle.min.js"></script>
```

</TabItem>
</Tabs>

## Configure

First, create a new file called `nexys.js|ts` somewhere on your project. Preferably on the root of your project. Then, add the following code to the file to get started.

```ts
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

To use **Nexys**, you need to initialize it. To do that, import the `nexys` file you created earlier and call the `init` method anywhere on your application preferably on the root of your application like `pages/_app.tsx` on **NextJS** or `index.tsx` on **React**. You cant use any **Nexys** feature without initializing.

```ts
...
// highlight-next-line
nexys.init();
...
```


## Usage

Now, you can use **Nexys** anywhere on your project. Here's an example:

```tsx
import nexys from "../nexys";

nexys.log("Hello World!");
nexys.error({ message: "test error" });
```

## In React:

```tsx title="pages/index.tsx"
// highlight-next-line
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