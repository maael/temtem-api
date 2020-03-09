import cors from "../../../util/cors";
import logHit from "../../../util/logHit";

const rewards = require("../../../data/freetemRewards.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(rewards);
  }, "freetem/rewards")
);
