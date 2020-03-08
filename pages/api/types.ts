import cors from "../../util/cors";
import logHit from "../../util/logHit";

const types = require("../../data/types.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(types);
  }, "types")
);
