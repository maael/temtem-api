import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const dyes = require("../../data/dyes.json");

export default cors(async (req, res) => {
  await sendPageView(req, "dyes");
  res.json(dyes);
});
