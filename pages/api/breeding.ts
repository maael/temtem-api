import cors from "../../util/cors";
import logHit from "../../util/logHit";

export default cors(
  logHit(async (_req, res) => {
    res.json([]);
  }, "breeding")
);
