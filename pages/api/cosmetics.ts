import cors from "../../util/cors";
import logHit from "../../util/logHit";

const cosmetics = require("../../data/cosmetics.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(cosmetics);
  }, "cosmetics")
);
