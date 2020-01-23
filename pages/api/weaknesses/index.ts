const weaknesses = require("../../../data/weaknesses.json");

export default (req, res) => {
  res.json(weaknesses);
};
