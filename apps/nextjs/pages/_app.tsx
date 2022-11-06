import type { AppProps } from "next/app";
import { useEffect } from "react";
import speedlog, {
  initErrorReturnTypes,
  initSuccessReturnTypes,
} from "speedlog";

export default function App({ Component, pageProps }: AppProps) {
  speedlog
    .init({
      apiKey: "1234567890",
      app: "speedlog-nextjs-example",
      version: "1.0.0",
      domain: "speedlog.io",
    })
    .then((data: initSuccessReturnTypes) => {
      console.log("Speedlog initialized with data", data);
    })
    .catch((error: initErrorReturnTypes) => {
      console.log("Speedlog initialization failed with error", error);
    });

  return <Component {...pageProps} />;
}