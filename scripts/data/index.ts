import getLocations from "./getLocations";
import getDyes from "./getDyes";
import getCosmetics from "./getCosmetics";
import getQuests from "./getQuests";
import embellishQuests from "./embellishQuests";
import getPatches from "./getPatches";
import embellishPatches from "./embellishPatches";
import getTypes from "./getTypes";
import getWeaknessTable from "./getWeaknessTable";
import getGear from "./getGear";
import getItems from "./getItems";
import embellishGear from "./embellishGear";
import getConditions from "./getConditions";
import getTechniques from "./getTechniques";
import embellishTechniques from "./embellishTechniques";
import getTraits from "./getTraits";
import embellishTraits from "./embellishTraits";
import getKnownTemtemSpecies from "./getKnownTemtemSpecies";
import embellishKnownTemtemSpecies from "./embellishKnownTemtemSpecies";
import embellishTemtemEvolutionTraits from "./embellishTemtemEvolutionTraits";
import embellishTemtemLocationPlacesAndNotes from "./embellishTemtemLocationPlacesAndNotes";
import embellishLocations from "./embellishLocations";
import getSaipark from "./getSaipark";
import getCharacters from "./getCharacters";
import getTrainingCourses from "./getTrainingCourses";
import getFreeTemRewards from "./getFreeTemRewards";
import getDojos from "./getDojos";
import * as log from "../util/log";
import checkAndWrite from "../util/checkAndWrite";

(async () => {
  await checkAndWrite("items", "items", getItems);
  await checkAndWrite("trainingCourses", "trainingCourses", getTrainingCourses);
  await checkAndWrite("types", "types", getTypes);
  await checkAndWrite("dyes", "dyes", getDyes);
  await checkAndWrite("cosmetics", "cosmetics", getCosmetics);
  await checkAndWrite("weaknesses", "weaknesses", getWeaknessTable);
  const conditions = await checkAndWrite(
    "conditions",
    "conditions",
    getConditions
  );
  await checkAndWrite("characters", "characters", getCharacters);
  await checkAndWrite("quests", "quests", async () => {
    const quests = await getQuests();
    return embellishQuests(quests || []);
  });
  await checkAndWrite("patches", "patches", async () => {
    const patches = await getPatches();
    return embellishPatches(patches || []);
  });
  const gear = await checkAndWrite("gear", "gear", async () => {
    const g = await getGear();
    return embellishGear(g!);
  });
  const techniques = await checkAndWrite(
    "techniques",
    "techniques",
    async () => {
      const t = await getTechniques();
      return embellishTechniques(t || [], conditions);
    }
  );
  const traits = await checkAndWrite("traits", "traits", async () => {
    const t = await getTraits();
    return embellishTraits(t || []);
  });
  const temtem = await checkAndWrite(
    "temtem",
    "knownTemtemSpecies",
    async () => {
      const knownTemtem = await getKnownTemtemSpecies();
      const embellishedTemtem = await embellishKnownTemtemSpecies(
        knownTemtem || []
      );
      return embellishTemtemEvolutionTraits(embellishedTemtem || []);
    }
  );
  const locations = await checkAndWrite("locations", "locations", async () => {
    const initialLocations = await getLocations();
    const embellishedLocations = embellishLocations(initialLocations, temtem);
    return embellishedLocations;
  });
  await checkAndWrite("temtem", "knownTemtemSpecies", async () => {
    return embellishTemtemLocationPlacesAndNotes(temtem || [], locations || []);
  });
  await checkAndWrite("saipark", "saipark", getSaipark);
  await checkAndWrite("freetemRewards", "freetemRewards", async () =>
    getFreeTemRewards(gear)
  );
  await checkAndWrite("dojos", "dojos", async () => {
    return getDojos(temtem || [], techniques || [], traits || []);
  });
})().catch((e) => {
  log.error(e);
  throw e;
});
