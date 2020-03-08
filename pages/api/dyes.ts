import cors from "../../util/cors";
import logHit from "../../util/logHit";

const dyes = require("../../data/dyes.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(dyes);
  }, "dyes")
);
