import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

export default cors((req, res) => {
  sendPageView(req, "breeding");
  res.json([]);
});
