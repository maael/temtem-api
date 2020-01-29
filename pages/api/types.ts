import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const types = require("../../data/types.json");

export default cors(async (req, res) => {
  await sendPageView(req, "types");
  res.json(types);
});
