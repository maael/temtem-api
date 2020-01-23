import path from 'path';
import throat from 'throat';
import pipeFile from '../util/pipeFile';
import * as log from '../util/log';

const gear = require('../../data/gear.json');

const CONCURRENCY_LIMIT = 10;

export default async function getGearIcons () {
  log.info('Starting');
  await Promise.all(gear.map(throat(CONCURRENCY_LIMIT, async (item) => {
    try {
      const {base} = path.parse(item.wikiIconUrl);
      const cleanFilename = base.split('-').pop()!;
      await pipeFile(item.wikiIconUrl as unknown as string, ['images', 'icons', 'gear', cleanFilename]);
    } catch (e) {
      log.error(e.message);
    }
  })));
  log.info('Finished');
}