import cors from "../../util/cors";
import pruneData from "../../util/pruneData";
import logHit from "../../util/logHit";

const traits = require("../../data/traits.json");

export default cors(
  logHit(async (req, res) => {
    const query = req.query as Record<string, string>;
    res.json(pruneData(traits, query.names, query.fields));
  }, "traits")
);
