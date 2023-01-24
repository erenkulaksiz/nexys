import Nexys from "nexys";

export const nexys = new Nexys("TESTING_API_KEY", {
  appName: "TESTING_APP_NAME",
  debug: true,
  logPoolSize: 10,
  localStorage: {
    cryption: false,
  },
});

nexys.configure((config) => {
  config.setUser("test");
  config.setClient("test");
});
