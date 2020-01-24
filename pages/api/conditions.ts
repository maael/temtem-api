import cors from "../../util/cors";
const conditions = require("../../data/conditions.json");

export default cors((req, res) => {
  res.json(conditions);
});
