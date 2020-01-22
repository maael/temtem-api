import {promises as fs} from 'fs';
import path from 'path';
import got from 'got';
import cheerio from 'cheerio';

export default async function getTraits () {
  console.info('Starting');
  try {
    console.info('Running');
    const result = await got('https://temtem.gamepedia.com/Category:Traits');
    const $ = cheerio.load(result.body);
    const page = $('#mw-pages');
    const traits = page.find('a').map((_i, el) => {
      return {
        name: $(el).text().trim(),
        wikiUrl: `https://temtem.gamepedia.com${$(el).attr('href')}`
      }
    }).toArray();
    await fs.writeFile(path.join(__dirname, '..', 'data', 'traits.json'), JSON.stringify(traits))
    return traits;
  } catch (e) {
    console.error('Error', e.message)
  }
}