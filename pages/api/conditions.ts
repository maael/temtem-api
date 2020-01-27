import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const conditions = require("../../data/conditions.json");

export default cors((req, res) => {
  sendPageView(req, "conditions");
  res.json(conditions);
});
