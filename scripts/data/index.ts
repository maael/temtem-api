import getWeaknessTable from './getWeaknessTable';
import getGear from './getGear';
import getStatuses from './getStatuses';
import getTechniques from './getTechniques';
import embellishTechniques from './embellishTechniques';
import getTraits from './getTraits';
import embellishTraits from './embellishTraits';
import getKnownTemTemSpecies from './getKnownTemTemSpecies';
import embellishKnownTemTemSpecies from './embellishKnownTemTemSpecies';
import * as log from '../util/log';

(async () => {
  await getGear();
  await getStatuses();
  await getWeaknessTable();
  const techniques = await getTechniques();
  await embellishTechniques(techniques);
  const traits = await getTraits();
  await embellishTraits(traits);
  const knownTemTem = await getKnownTemTemSpecies();
  await embellishKnownTemTemSpecies(knownTemTem);
})().catch(log.error);