const patches = require("../../data/patches.json");

export default (req, res) => {
  res.json(patches);
};
