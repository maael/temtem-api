import { NextApiResponse, NextApiRequest } from "next";
import cors from "../../../util/cors";
import pruneData from "../../../util/pruneData";
import expandFields from "../../../util/expandFields";
import { TechniqueSource } from "../../../scripts/data/embellishKnownTemtemSpecies";
import { addWeaknesses } from "../../../util/calculateWeaknesses";

const knownTemtems = require("../../../data/knownTemtemSpecies.json");
const traits = require("../../../data/traits.json");
const techniques = require("../../../data/techniques.json");
const types = require("../../../data/types.json");
const trainingCourses = require("../../../data/trainingCourses.json");

const identity = (a: any) => a;

export default cors(async (req: NextApiRequest, res: NextApiResponse) => {
  const temtem = knownTemtems.find(
    ({ number: num }) => num === Number(req.query.number)
  );
  if (!temtem) {
    res.status(404).json({ error: "Missing temtem" });
    return;
  }
  const pruned = pruneData(
    [temtem],
    undefined,
    (req.query.fields || "").toString()
  );
  if (
    !req.query.hasOwnProperty("expand") ||
    (req.query.expand || "").toString() === "false"
  ) {
    res.json(addWeaknesses(pruned.pop(), !!req.query.weaknesses));
  } else {
    const expand = ((req.query.expand || "").toString() || "")
      .split(",")
      .map(t => t.trim());
    const result = pruned
      .map(
        expand.includes("traits")
          ? expandFields(traits, "traits", "name")
          : identity
      )
      .map(
        expand.includes("techniques")
          ? expandFields(techniques, "techniques", "name", "name")
          : identity
      )
      .map(
        expand.includes("techniques")
          ? customExpandTechniqueSource(trainingCourses)
          : identity
      )
      .map(
        expand.includes("types")
          ? expandFields(types, "types", "name")
          : identity
      );
    res.json(addWeaknesses(result.pop(), !!req.query.weaknesses));
  }
});

function customExpandTechniqueSource(trainingCoursesList: any[]) {
  return function(input) {
    input.techniques = input.techniques.map(tech => {
      if (tech.source !== TechniqueSource.TRAINING_COURSE) return tech;
      return Object.assign(tech, {
        trainingCourse: trainingCoursesList.find(({ name }) => tech.name)
      });
    });
    return input;
  };
}
