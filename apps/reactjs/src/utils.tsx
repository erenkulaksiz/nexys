import Nexys from "nexys";

export const nexys: Nexys = new Nexys("2cf514cc-196b-4608-80bb-15ce0bf15680", {
  appName: "test11",
  debug: true,
  server: "http://localhost:3000",
  localStorage: {
    cryption: false,
  },
});
