import Nexys from "nexys";

export const nexys: Nexys = new Nexys("TEST_PROJECT_PUBLIC_KEY", {
  appName: "APP_NAME",
  debug: true,
  server: "http://localhost:3000",
  localStorage: {
    cryption: false,
  },
});
