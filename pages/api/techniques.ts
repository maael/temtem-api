const techniques = require('../../data/techniques.json');

export default (req, res) => {
  res.json(techniques);
}