import Nexys from "nexys";

export const nexys = new Nexys("TEST_PROJECT_PUBLIC_KEY", {
  appName: "TESTING_APP_NAME",
  debug: true,
  server: "http://localhost:3000",
  logPoolSize: 10,
  localStorage: {
    cryption: false,
  },
});

nexys.configure((config) => {
  config.setUser("test");
  config.setClient("test");
});
