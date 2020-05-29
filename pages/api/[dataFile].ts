import cors from "../../util/cors";

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
  types: require("../../data/types.json")
};

export default cors(async (req, res) => {
  const { dataFile } = req.query;
  const dataFileStr = dataFile.toString();
  if (Object.keys(dataMap).includes(dataFileStr)) {
    res.json(dataMap[dataFileStr]);
  } else {
    res.status(404).send("Not found");
  }
});
