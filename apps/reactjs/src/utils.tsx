import Nexys from "nexys";
import { debugServer } from "nexys/dist/utils";

export const nexys: Nexys = new Nexys("d1ae511a-af59-46a8-8db7-d0db795be3c4", {
  appName: "test2",
  debug: true,
  //server: debugServer,
  //ignoreType: "INFO",
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
