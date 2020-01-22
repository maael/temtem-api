import stream from 'stream';
import {promisify} from 'util';
import fs from 'fs';
import path from 'path';
import got from 'got';
import throat from 'throat';

const knownTems = require('../../data/knownTemTemSpecies.json');

const pipeline = promisify(stream.pipeline);

const CONCURRENCY_LIMIT = 10;

export default async function getTemPortraits () {
  await Promise.all(knownTems.map(throat(CONCURRENCY_LIMIT, async (item) => {
    await pipeline(
      got.stream(item.portraitWikiUrl as unknown as string),
      fs.createWriteStream(path.join(__dirname, '..', '..', 'public', 'images', 'portraits', 'temtem', `${item.name}.png`))
    )
  })));
}