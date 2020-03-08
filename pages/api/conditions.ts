import cors from "../../util/cors";
import logHit from "../../util/logHit";

const conditions = require("../../data/conditions.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(conditions);
  }, "conditions")
);
