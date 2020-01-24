import cors from "../../util/cors";
const gear = require("../../data/gear.json");

export default cors((req, res) => {
  res.json(gear);
});
