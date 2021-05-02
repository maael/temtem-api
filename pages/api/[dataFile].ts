import cors from "../../util/cors";
import pruneData from "../../util/pruneData";

const dataMap = {
  breeding: [],
  characters: require("../../data/characters.json"),
  conditions: require("../../data/conditions.json"),
  cosmetics: require("../../data/cosmetics.json"),
  dyes: require("../../data/dyes.json"),
  gear: require("../../data/gear.json"),
  items: require("../../data/items.json"),
  locations: require("../../data/locations.json"),
  patches: require("../../data/patches.json"),
  quests: require("../../data/quests.json"),
  saipark: require("../../data/saipark.json"),
  "training-courses": require("../../data/trainingCourses.json"),
  types: require("../../data/types.json"),
  techniques: require("../../data/techniques.json"),
  traits: require("../../data/traits.json"),
  dojos: require("../../data/dojos.json"),
};

export default cors(async (req, res) => {
  const { dataFile } = req.query;
  const dataFileStr = dataFile.toString();
  if (Object.keys(dataMap).includes(dataFileStr)) {
    let data = dataMap[dataFileStr];
    try {
      data = pruneData(
        data,
        req.query.names,
        req.query.fields,
        req.query.limit
      );
    } catch {
      // Do nothing
    }
    res.json(data);
  } else {
    res.status(404).send("Not found");
  }
});
