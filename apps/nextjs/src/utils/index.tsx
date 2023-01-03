import Nexys from "nexys";

export const nexys = new Nexys("TESTING_API_KEY", {
  debug: true,
  sendAllOnType: ["ERROR", "WARNING"],
  logPoolSize: 10,
});
