import cors from "../../util/cors";
const types = require("../../data/types.json");

export default cors((req, res) => {
  res.json(types);
});
