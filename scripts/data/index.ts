import getDyes from "./getDyes";
import getCosmetics from "./getCosmetics";
import getQuests from "./getQuests";
import embellishQuests from "./embellishQuests";
import getPatches from "./getPatches";
import embellishPatches from "./embellishPatches";
import getTypes from "./getTypes";
import getWeaknessTable from "./getWeaknessTable";
import getGear from "./getGear";
import embellishGear from "./embellishGear";
import getConditions from "./getConditions";
import getTechniques from "./getTechniques";
import embellishTechniques from "./embellishTechniques";
import getTraits from "./getTraits";
import embellishTraits from "./embellishTraits";
import getKnownTemtemSpecies from "./getKnownTemtemSpecies";
import embellishKnownTemtemSpecies from "./embellishKnownTemtemSpecies";
import * as log from "../util/log";
import checkAndWrite from "../util/checkAndWrite";

(async () => {
  await checkAndWrite("dyes", "dyes", getDyes);
  await checkAndWrite("cosmetics", "cosmetics", getCosmetics);
  await checkAndWrite("weaknesses", "weaknesses", getWeaknessTable);
  await checkAndWrite("types", "types", getTypes);
  await checkAndWrite("conditions", "conditions", getConditions);
  await checkAndWrite("quests", "quests", async () => {
    const quests = await getQuests();
    return embellishQuests(quests || []);
  });
  await checkAndWrite("patches", "patches", async () => {
    const patches = await getPatches();
    return embellishPatches(patches || []);
  });
  await checkAndWrite("gear", "gear", async () => {
    const gear = await getGear();
    return embellishGear(gear!);
  });
  await checkAndWrite("techniques", "techniques", async () => {
    const techniques = await getTechniques();
    return embellishTechniques(techniques || []);
  });
  await checkAndWrite("traits", "traits", async () => {
    const traits = await getTraits();
    return embellishTraits(traits || []);
  });
  await checkAndWrite("missing", "knownTemtemSpecies", async () => {
    const knownTemtem = await getKnownTemtemSpecies();
    return embellishKnownTemtemSpecies(knownTemtem || []);
  });
})().catch(e => {
  log.error(e);
  throw e;
});
