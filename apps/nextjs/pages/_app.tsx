import type { AppProps } from "next/app";
import { useEffect } from "react";
import nexys from "nexys";

export default function App({ Component, pageProps }: AppProps) {
  async function init() {
    await nexys.init({
      apiKey: "1234567891234567",
      app: "nexys-nextjs-example",
      version: "1.0.0",
      domain: "nexys.app",
    });

    nexys.log("test");
  }

  useEffect(() => {
    init();
  }, []);

  return <Component {...pageProps} />;
}
