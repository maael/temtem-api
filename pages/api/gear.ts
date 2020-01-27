import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const gear = require("../../data/gear.json");

export default cors((req, res) => {
  sendPageView(req, "gear");
  res.json(gear);
});
