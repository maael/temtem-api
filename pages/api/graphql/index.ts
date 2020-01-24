import cors from "../../../util/cors";

export default cors((req, res) => {
  res.send("hey");
});
