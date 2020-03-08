import cors from "../../../../util/cors";
import logHit from "../../../../util/logHit";

const allTemtem = require("../../../../data/knownTemtemSpecies.json");

export default cors(
  logHit(async (req, res) => {
    const { temtem, level } = req.query as Record<string, string>;
    const foundTemtem =
      allTemtem.find(
        ({ name }) => name.toLowerCase() === temtem.toLowerCase()
      ) || {};
    const catchRate = foundTemtem.catchRate || 200;
    res.json({
      temtem: temtem,
      level: level,
      catchRate,
      reward: calculateFreetemReward(catchRate, Number(level))
    });
  }, "freetem/[temtem]/[level]")
);

// Taken from the wiki's updateReward function available on Temtem pages
function calculateFreetemReward(catchRate: number, level: number) {
  return 20 + Math.ceil((level / catchRate) * 300);
}
