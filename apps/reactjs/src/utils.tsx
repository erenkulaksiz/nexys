import Nexys from "nexys";

export const nexys: Nexys = new Nexys("2f22dec8-1850-4bd8-88fe-b2ffda521f1e", {
  appName: "test10",
  debug: true,
  server: "http://localhost:3000",
  localStorage: {
    cryption: false,
  },
});
