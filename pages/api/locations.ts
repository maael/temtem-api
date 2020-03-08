import cors from "../../util/cors";
import logHit from "../../util/logHit";

const locations = require("../../data/locations.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(locations);
  }, "location")
);
