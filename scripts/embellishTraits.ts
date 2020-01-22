import {promises as fs} from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import throat from 'throat';
import got from 'got/dist/source';

const CONCURRENCY_LIMIT = 10;

export default async function getTraits (traits: any) {
  console.info('Starting');
  try {
    console.info('Running');
    const webpages: any[] = await Promise.all(traits.map(throat(CONCURRENCY_LIMIT, async (item) => {
      return {
        item,
        html: (await got((item as any).wikiUrl)).body
      }
    })));

    const result = webpages.map(({item, html}) => {
      const $ = cheerio.load(html);
      return {
        ...item,
        description: $('#In-Game_Description').parent().next().text().trim().replace(/\\n/g, '')
      }
    }).sort((a, b) => a.name.localeCompare(b.name));

    await fs.writeFile(path.join(__dirname, '..', 'data', 'traits.json'), JSON.stringify(result))
    return traits;
  } catch (e) {
    console.error('Error', e.message);
  }
}