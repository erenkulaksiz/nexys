import type { AppProps } from "next/app";
import { useEffect } from "react";
import nexys from "nexys";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    nexys.init(
      {
        apiKey: "1234567891234567",
        app: "nexys-nextjs-example",
        version: "1.0.0",
        domain: "nexys.app",
      },
      { logTreshold: 4 }
    );
    //nexys.log("test", "tag");
    nexys.error("this is an error", "tag");
  }, []);

  return <Component {...pageProps} />;
}
