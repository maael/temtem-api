import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

export default cors(async (req, res) => {
  await sendPageView(req, "breeding");
  res.json([]);
});
