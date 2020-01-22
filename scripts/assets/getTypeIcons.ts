import stream from 'stream';
import {promisify} from 'util';
import fs from 'fs';
import path from 'path';
import got from 'got';
import cheerio from 'cheerio';

const pipeline = promisify(stream.pipeline);

export default async function getTypeIcons () {
  const result = await got('https://temtem.gamepedia.com/Category:Type_icons');
  const $ = cheerio.load(result.body);
  const images = $('#mw-content-text').find('img').map((_i, el) => $(el).attr('src')).toArray();
  await Promise.all(images.map(async (img) => {
    const p = path.parse(img as unknown as string);
    const filename = `${p.name.split('-')[1]}${p.ext.split('?')[0]}`;
    await pipeline(
      got.stream(img as unknown as string),
      fs.createWriteStream(path.join(__dirname, '..', '..', 'public', 'images', 'icons', 'types', filename))
    )
  }));
}