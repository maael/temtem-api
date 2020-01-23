import getTypeIcons from './getTypeIcons';
import getTemPortraits from './getTemPortraits';
import getStatusIcons from './getStatusIcons';
import getGearIcons from './getGearIcons';
import * as log from '../util/log';

(async () => {
  await getTypeIcons();
  await getTemPortraits();
  await getStatusIcons();
  await getGearIcons();
})().catch(log.error);