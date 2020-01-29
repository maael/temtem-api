import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const conditions = require("../../data/conditions.json");

export default cors(async (req, res) => {
  await sendPageView(req, "conditions");
  res.json(conditions);
});
