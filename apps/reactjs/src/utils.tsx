import Nexys from "nexys";
import { debugServer } from "nexys/dist/utils";

export const nexys: Nexys = new Nexys("API_KEY", {
  appName: "reactSample",
  debug: true,
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
