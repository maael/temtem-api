import pruneData from "../../util/pruneData";
import expandFields from "../../util/expandFields";
const knownTemTems = require("../../data/knownTemTemSpecies.json");
const traits = require("../../data/traits.json");
const techniques = require("../../data/techniques.json");

export default (req, res) => {
  const pruned = pruneData(knownTemTems, req.query.names, req.query.fields);
  if (!req.query.hasOwnProperty("expand") || req.query.expand === false) {
    res.json(pruned);
  } else {
    const result = pruned
      .map(expandFields(traits, "traits", "name"))
      .map(expandFields(techniques, "techniques", "name", "name"));
    res.json(result);
  }
};
