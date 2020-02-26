import cors from "../../../../util/cors";
import { sendPageView } from "../../../../util/gaMeasurementProtocol";

const allTemtem = require("../../../../data/knownTemtemSpecies.json");

export default cors(async (req, res) => {
  await sendPageView(req, "freetem");
  const { temtem, level } = req.query;
  const foundTemtem =
    allTemtem.find(({ name }) => name.toLowerCase() === temtem.toLowerCase()) ||
    {};
  const catchRate = foundTemtem.catchRate || 200;
  res.json({
    temtem: temtem,
    level: level,
    catchRate,
    reward: calculateFreetemReward(catchRate, level)
  });
});

// Taken from the wiki's updateReward function available on Temtem pages
function calculateFreetemReward(catchRate: number, level: number) {
  return 20 + Math.ceil((level / catchRate) * 300);
}
