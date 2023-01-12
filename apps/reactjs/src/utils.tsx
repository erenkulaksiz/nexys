import Nexys from "nexys";

export const nexys: Nexys = new Nexys("API_KEY", {
  appName: "APP_NAME",
  debug: true,
  localStorage: {
    cryption: false,
  },
});
