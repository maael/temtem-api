import cors from "../../util/cors";
import logHit from "../../util/logHit";

const gear = require("../../data/gear.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(gear);
  }, "gear")
);
