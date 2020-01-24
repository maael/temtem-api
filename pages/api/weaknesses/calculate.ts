import cors from "../../../util/cors";
import { TYPES } from "../../../util/constants";
const weaknesses = require("../../../data/weaknesses.json");

export default cors((req, res) => {
  const attacking = (req.query.attacking || "").trim();
  const defending = (req.query.defending || "").split(",").map(t => t.trim());
  if (
    attacking.length &&
    TYPES.includes(attacking) &&
    defending.length &&
    defending.every(d => TYPES.includes(d))
  ) {
    const attackingRow = weaknesses[attacking];
    const defendingModifiers = defending.map(d => attackingRow[d]);
    res.json({
      attacking,
      defending,
      modifiers: defendingModifiers,
      result: defendingModifiers.reduce((pre, cur) => pre * cur, 1)
    });
  } else {
    res.status(400).json({ error: "An unknown type is present" });
  }
});
