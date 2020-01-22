import getWeaknessTable from './getWeaknessTable';
import getTechniques from './getTechniques';
import embellishTechniques from './embellishTechniques';
import getTraits from './getTraits';
import embellishTraits from './embellishTraits';
import getKnownTemTemSpecies from './getKnownTemTemSpecies';
import embellishKnownTemTemSpecies from './embellishKnownTemTemSpecies';

(async () => {
  await getWeaknessTable();
  const techniques = await getTechniques();
  await embellishTechniques(techniques);
  const traits = await getTraits();
  await embellishTraits(traits);
  const knownTemTem = await getKnownTemTemSpecies();
  await embellishKnownTemTemSpecies(knownTemTem);
})();