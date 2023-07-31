---
sidebar_position: 5
---

# Metrics

---

Metrics are the data that you want to collect from your users. You can collect any data you want. You can collect user data, or you can send them anonymously, or you can send them both. **Nexys** is a **privacy-first** analytics platform, and we don't collect any data from your users without your permission.

## Metrics is only available on `NextJS` platforms.

React and NodeJS support will come soon.

## Usage

You can use `nexys.metric` anywhere on your project. Here's an example:

```tsx title="pages/_app.tsx"
import { nexys } from "../nexys";
import type { NextWebVitalsMetric, AppProps } from "next/app";

// Exporting function called `reportWebVitals` is required for NextJS to collect metrics.
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // highlight-next-line
  nexys.metric(metric);
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

This code will collect FCP (First Contentful Paint), LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), FID (First Input Delay), TTFB (Time to First Byte).
 
You can view your app metrics on your project's [dashboard](https://dash.nexys.app/) inside **Metrics** tab.