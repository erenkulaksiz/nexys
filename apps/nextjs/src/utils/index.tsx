import Nexys from "nexys";

export const nexys = new Nexys("TESTING_API_KEY", {
  debug: true,
  sendAllLogsOnType: ["ERROR", "WARNING"],
  logPoolSize: 10,
  appName: "TESTING_APP_NAME",
});
