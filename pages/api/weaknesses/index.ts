import cors from "../../../util/cors";
const weaknesses = require("../../../data/weaknesses.json");

export default cors((req, res) => {
  res.json(weaknesses);
});
