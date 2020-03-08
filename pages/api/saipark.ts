import cors from "../../util/cors";
import logHit from "../../util/logHit";

const saipark = require("../../data/saipark.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(saipark);
  }, "saipark")
);
