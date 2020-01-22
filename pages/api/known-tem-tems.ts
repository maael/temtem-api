import pruneData from '../../util/pruneData';
const knownTemTems = require('../../data/knownTemTemSpecies.json');

export default (req, res) => {
  res.json(pruneData(knownTemTems, req.query.names));
}