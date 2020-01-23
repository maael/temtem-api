import getTypeIcons from './getTypeIcons';
import getTemPortraits from './getTemPortraits';
import getStatusIcons from './getStatusIcons';
import getGearIcons from './getGearIcons';

(async () => {
  await getTypeIcons();
  await getTemPortraits();
  await getStatusIcons();
  await getGearIcons();
})();