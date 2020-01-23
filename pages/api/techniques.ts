import pruneData from "../../util/pruneData";
const techniques = require("../../data/techniques.json");

export default (req, res) => {
  res.json(pruneData(techniques, req.query.names, req.query.fields));
};
