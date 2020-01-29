import cors from "../../../util/cors";
import { sendPageView } from "../../../util/gaMeasurementProtocol";

const weaknesses = require("../../../data/weaknesses.json");

export default cors(async (req, res) => {
  await sendPageView(req, "weakness");
  res.json(weaknesses);
});
