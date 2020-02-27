import cors from "../../util/cors";
import { sendPageView } from "../../util/gaMeasurementProtocol";

const trainingCourses = require("../../data/trainingCourses.json");

export default cors(async (req, res) => {
  await sendPageView(req, "trainingCourses");
  res.json(trainingCourses);
});
