import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const gear = require("../../data/gear.json");

export default cors((req, res) => {
  // tslint:disable-next-line:no-floating-promises
  sendPageView(req, "gear");
  res.json(gear);
});
