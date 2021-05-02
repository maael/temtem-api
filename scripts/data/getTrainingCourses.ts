import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";

export enum TrainingCourseLocationType {
  FOUND = "found",
  QUEST = "quest",
}

export interface TrainingCourse {
  number: string;
  technique: string;
  type: string;
  location: string;
  locationType: TrainingCourseLocationType;
}

export default async function getTrainingCourses() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.gamepedia.com/Training_Course");
    const $ = cheerio.load(result.body);
    const table = $("#List_of_Courses").parent().next();
    const trainingCourses = typedToArray<TrainingCourse>(
      table.find("tr").map((i, el) => {
        if (i === 0) return;
        const parts = typedToArray<string>(
          $(el)
            .find("td")
            .map((_j, td) => $(td).text().trim())
        );
        return {
          number: parts[0],
          technique: parts[1],
          type: parts[2] || "Unknown",
          location: parts[3] || "Unknown",
          locationType: ["complete", "reward", "quest"].some((k) =>
            (parts[3] || "").toLowerCase().includes(k)
          )
            ? TrainingCourseLocationType.QUEST
            : TrainingCourseLocationType.FOUND,
        };
      })
    );
    return trainingCourses;
  } catch (e) {
    log.error(e.message);
  }
}
