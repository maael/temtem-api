const conditions = require("../../data/conditions.json");

export default (req, res) => {
  res.json(conditions);
};
