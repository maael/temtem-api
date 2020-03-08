import cors from "../../../util/cors";
import logHit from "../../../util/logHit";

const weaknesses = require("../../../data/weaknesses.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(weaknesses);
  }, "weaknesses")
);
