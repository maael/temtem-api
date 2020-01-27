import cors from "../../util/cors";
import pruneData from "../../util/pruneData";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const techniques = require("../../data/techniques.json");

export default cors((req, res) => {
  sendPageView(req, "techniques");
  res.json(pruneData(techniques, req.query.names, req.query.fields));
});
