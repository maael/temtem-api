import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const characters = require("../../data/characters.json");

export default cors(async (req, res) => {
  await sendPageView(req, "characters");
  res.json(characters);
});
