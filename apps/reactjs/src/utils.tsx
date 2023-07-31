import Nexys from "nexys";
import { debugServer } from "nexys/dist/utils";

export const nexys: Nexys = new Nexys("fa010d89-dcd6-4273-b236-479296c97a19", {
  appName: "test",
  debug: true,
  //server: debugServer,
  localStorage: {
    cryption: false,
  },
});
