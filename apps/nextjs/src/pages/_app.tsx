import type { AppProps } from "next/app";
import type { configFunctions } from "nexys/dist/src/types";
import { nexys } from "../utils";

export default function App({ Component, pageProps }: AppProps) {
  nexys.configure((config: configFunctions) => {
    config.setUser("selamKISMET");
  });

  return <Component {...pageProps} />;
}
