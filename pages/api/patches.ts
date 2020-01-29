import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const patches = require("../../data/patches.json");

export default cors(async (req, res) => {
  await sendPageView(req, "patches");
  res.json(patches);
});
