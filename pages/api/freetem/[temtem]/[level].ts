import cors from "../../../../util/cors";
import calculateFreetemReward from "../../../../util/calculateFreetemReward";

const allTemtem = require("../../../../data/knownTemtemSpecies.json");

export default cors(async (req, res) => {
  const { temtem, level } = req.query as Record<string, string>;
  const foundTemtem =
    allTemtem.find(({ name }) => name.toLowerCase() === temtem.toLowerCase()) ||
    {};
  const catchRate = foundTemtem.catchRate || 200;
  res.json({
    temtem: temtem,
    level: level,
    catchRate,
    reward: calculateFreetemReward(catchRate, Number(level)),
  });
});
