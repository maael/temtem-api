import cors from "../../../util/cors";
import { sendPageView } from "../../../util/gaMeasurementProtocol";

const weaknesses = require("../../../data/weaknesses.json");

export default cors((req, res) => {
  // tslint:disable-next-line:no-floating-promises
  sendPageView(req, "weakness");
  res.json(weaknesses);
});
