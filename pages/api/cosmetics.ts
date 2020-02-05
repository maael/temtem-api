import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const cosmetics = require("../../data/cosmetics.json");

export default cors(async (req, res) => {
  await sendPageView(req, "cosmetics");
  res.json(cosmetics);
});
