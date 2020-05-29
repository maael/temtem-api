import cors from "../../util/cors";
import pruneData from "../../util/pruneData";

const traits = require("../../data/traits.json");

export default cors(async (req, res) => {
  const query = req.query as Record<string, string>;
  res.json(pruneData(traits, query.names, query.fields));
});
