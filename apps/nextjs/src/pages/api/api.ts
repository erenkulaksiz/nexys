import { NextApiRequest, NextApiResponse } from "next";
import Nexys from "nexys";

const nexys = new Nexys("API_KEY", {
  appName: "TESTT",
  debug: true,
  logPoolSize: 1,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  nexys.log("LOOOOG");
  res.status(200).json({ name: "John Doe" });
}
