import Nexys from "nexys";

const nexys = new Nexys("test", { appName: "test", debug: true })

function test() {
  console.log("test");
  nexys.log("test");
}

test();
nexys.log("test");
nexys.error("test");