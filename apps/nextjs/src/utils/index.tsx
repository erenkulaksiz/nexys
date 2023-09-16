import Nexys from "nexys";

export const nexys = new Nexys("API_KEY", {
  appName: "APP_NAME",
  debug: true,
  server: "http://localhost:3000",
  logPoolSize: 10,
  localStorage: {
    cryption: false,
  },
});
