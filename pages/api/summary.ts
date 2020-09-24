import cors from "../../util/cors";

const data = require("../../data/summary.json");

export default cors(async (req, res) => {
  res.json(data);
});
