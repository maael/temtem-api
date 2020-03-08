import cors from "../../util/cors";
import logHit from "../../util/logHit";

const patches = require("../../data/patches.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(patches);
  }, "patches")
);
