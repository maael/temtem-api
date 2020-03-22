import cors from "../../util/cors";
import logHit from "../../util/logHit";

const items = require("../../data/items.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(items);
  }, "items")
);
