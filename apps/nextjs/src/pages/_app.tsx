import { nexys } from "../utils";
import type { NextWebVitalsMetric, AppProps } from "next/app";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  nexys.metric(metric);
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
