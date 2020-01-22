import getTypeIcons from './getTypeIcons';
import getTemPortraits from './getTemPortraits';

(async () => {
  await getTypeIcons();
  await getTemPortraits();
})();