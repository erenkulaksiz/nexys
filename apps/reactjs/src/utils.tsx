import Nexys from "nexys";

export const nexys = new Nexys("API_KEY", {
  appName: "APP_NAME",
  storeInLocalStorage: true,
  useCryptionOnLocalStorage: true,
  debug: true,
});
