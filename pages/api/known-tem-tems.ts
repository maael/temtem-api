import pruneData from "../../util/pruneData";
import expandFields from "../../util/expandFields";
const knownTemTems = require("../../data/knownTemTemSpecies.json");
const traits = require("../../data/traits.json");
const techniques = require("../../data/techniques.json");
const types = require("../../data/types.json");

const identity = (a: any) => a;

export default (req, res) => {
  const pruned = pruneData(knownTemTems, req.query.names, req.query.fields);
  if (!req.query.hasOwnProperty("expand") || req.query.expand === false) {
    res.json(pruned);
  } else {
    const expand = (req.query.expand || "").split(",").map(t => t.trim());
    const result = pruned
      .map(expand.includes('traits') ? expandFields(traits, "traits", "name") : identity)
      .map(expand.includes('techniques') ? expandFields(techniques, "techniques", "name", "name") : identity)
      .map(expand.includes('types') ? expandFields(types, "types", "name") : identity);
    res.json(result);
  }
};
