import Nexys from "nexys";

const nexys = new Nexys("API_KEY", { appName: "nodejsSample", debug: true })

// simple log
nexys.log("Info log.");

// log with type info
nexys.log(
  {
    name: 'steve',
    age: 24
  },
  { type: "INFO" }
);

// log simple error 
nexys.error("Error log.");

// clear all logs
nexys.clear();