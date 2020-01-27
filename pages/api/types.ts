import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const types = require("../../data/types.json");

export default cors((req, res) => {
  // tslint:disable-next-line:no-floating-promises
  sendPageView(req, "types");
  res.json(types);
});
