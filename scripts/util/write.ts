import {promises as fs} from 'fs';
import path from 'path';
import * as log from './log';

export default async function write (name: string, data: any) {
  log.info('writing', name);
  try {
    await fs.writeFile(path.join(__dirname, '..', '..', 'data', `${name}.json`), JSON.stringify(data));
    log.info('finished writing', name);
  } catch (e) {
    log.error('error writing', name, e.message);
  }
}