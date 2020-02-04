import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const quests = require("../../data/quests.json");

export default cors(async (req, res) => {
  await sendPageView(req, "quests");
  res.json(quests);
});
