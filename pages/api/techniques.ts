import cors from "../../util/cors";
import pruneData from "../../util/pruneData";
const techniques = require("../../data/techniques.json");

export default cors((req, res) => {
  res.json(pruneData(techniques, req.query.names, req.query.fields));
});
