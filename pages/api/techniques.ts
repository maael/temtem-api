import cors from "../../util/cors";
import pruneData from "../../util/pruneData";
import logHit from "../../util/logHit";

const techniques = require("../../data/techniques.json");

export default cors(
  logHit(async (req, res) => {
    const query = req.query as Record<string, string>;
    res.json(pruneData(techniques, query.names, query.fields));
  }, "techniques")
);
