import type { AppProps } from "next/app";
import { useEffect } from "react";
import speedlog from "speedlog-client";

export default function App({ Component, pageProps }: AppProps) {
  async function initSpeedlog() {
    await speedlog.init({
      apiKey: "1234567891234567",
      app: "speedlog-nextjs-example",
      version: "1.0.0",
      domain: "speedlog.io",
    });

    speedlog.log("test");
  }

  useEffect(() => {
    initSpeedlog();
  }, []);

  return <Component {...pageProps} />;
}
