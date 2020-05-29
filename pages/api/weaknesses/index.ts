import cors from "../../../util/cors";

const weaknesses = require("../../../data/weaknesses.json");

export default cors(async (_req, res) => {
  res.json(weaknesses);
});
