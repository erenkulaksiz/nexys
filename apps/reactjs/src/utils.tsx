import Nexys from "nexys";
import { debugServer } from "nexys/dist/utils";

export const nexys: Nexys = new Nexys("e38a73a4-35ae-4eb8-bc0b-0654326493e7", {
  appName: "999999949299",
  debug: true,
  server: debugServer,
  localStorage: {
    useLocalStorage: true,
    cryption: false,
    useAdapter: false,
    adapter: {
      getItem: async (key: string) => {
        return await localStorage.getItem(key);
      },
      setItem: async (key: string, value: string) => {
        return await localStorage.setItem(key, value);
      },
      removeItem: async (key: string) => {
        return await localStorage.removeItem(key);
      },
    },
  },
});
