const traits = require('../../data/traits.json');

export default (req, res) => {
  res.json(traits);
}