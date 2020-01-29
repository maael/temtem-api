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

(async () => {
  const patches = await getPatches();
  await embellishPatches(patches);
  await getTypes();
  await getConditions();
  await getWeaknessTable();
  const gear = await getGear();
  await embellishGear(gear!);
  const techniques = await getTechniques();
  await embellishTechniques(techniques);
  const traits = await getTraits();
  await embellishTraits(traits);
  const knownTemtem = await getKnownTemtemSpecies();
  await embellishKnownTemtemSpecies(knownTemtem);
})().catch(e => {
  log.error(e);
  throw e;
});
