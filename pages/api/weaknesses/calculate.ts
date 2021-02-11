import cors from "../../../util/cors";
import calculateWeaknesses from "../../../util/calculateWeaknesses";

export default cors(async (req, res) => {
  const query = req.query as Record<string, string>;
  const attacking = (query.attacking || "").trim();
  const defending = (query.defending || "").split(",").map(t => t.trim());
  try {
    res.json(calculateWeaknesses(defending, attacking));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
