import pruneData from '../../util/pruneData';
const traits = require('../../data/traits.json');

export default (req, res) => {
  res.json(pruneData(traits, req.query.names));
}