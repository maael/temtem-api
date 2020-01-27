import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

export default cors((req, res) => {
  // tslint:disable-next-line:no-floating-promises
  sendPageView(req, "breeding");
  res.json([]);
});
