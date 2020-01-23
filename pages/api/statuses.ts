const statuses = require('../../data/statuses.json');

export default (req, res) => {
  res.json(statuses);
}