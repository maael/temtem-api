import cors from "../../../util/cors";

const rewards = require("../../../data/freetemRewards.json");

export default cors(async (_req, res) => {
  res.json(rewards);
});
