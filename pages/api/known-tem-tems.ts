const knownTemTems = require('../../data/knownTemTemSpecies.json');

export default (req, res) => {
  res.json(knownTemTems);
}