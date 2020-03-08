import cors from "../../util/cors";
import logHit from "../../util/logHit";

const quests = require("../../data/quests.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(quests);
  }, "quests")
);
