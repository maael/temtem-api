import cors from "../../util/cors";
import pruneData from "../../util/pruneData";
const traits = require("../../data/traits.json");

export default cors((req, res) => {
  res.json(pruneData(traits, req.query.names, req.query.fields));
});
