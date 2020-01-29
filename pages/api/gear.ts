import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const gear = require("../../data/gear.json");

export default cors(async (req, res) => {
  await sendPageView(req, "gear");
  res.json(gear);
});
