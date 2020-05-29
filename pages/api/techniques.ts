import cors from "../../util/cors";
import pruneData from "../../util/pruneData";

const techniques = require("../../data/techniques.json");

export default cors(async (req, res) => {
  const query = req.query as Record<string, string>;
  res.json(pruneData(techniques, query.names, query.fields));
});
