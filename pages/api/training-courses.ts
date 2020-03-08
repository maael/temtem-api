import cors from "../../util/cors";
import logHit from "../../util/logHit";

const trainingCourses = require("../../data/trainingCourses.json");

export default cors(
  logHit(async (_req, res) => {
    res.json(trainingCourses);
  }, "training-courses")
);
