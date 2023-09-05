import Nexys from "nexys";
import { debugServer } from "nexys/dist/utils";

export const nexys: Nexys = new Nexys("fa010d89-dcd6-4273-b236-479296c97a19", {
  appName: "test",
  debug: true,
  //server: debugServer,
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
      clear: async () => {
        return await localStorage.clear();
      },
    },
  },
});
