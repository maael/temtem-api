import cors from "../../util/cors";
import logHit from "../../util/logHit";

const characters = require("../../data/characters.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(characters);
  }, "characters")
);
