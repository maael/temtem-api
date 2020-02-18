import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const saipark = require("../../data/saipark.json");

export default cors(async (req, res) => {
  await sendPageView(req, "saipark");
  res.json(saipark);
});
