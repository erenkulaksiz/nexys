import { NextApiRequest, NextApiResponse } from "next";
import { nexys } from "../../utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  nexys.log("LOOOOG");
  res.status(200).json({ name: "John Doe" });
}
