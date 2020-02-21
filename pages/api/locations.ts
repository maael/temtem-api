import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const locations = require("../../data/locations.json");

export default cors(async (req, res) => {
  await sendPageView(req, "locations");
  res.json(locations);
});
