import {promises as fs} from 'fs';
import path from 'path';
import got from 'got';
import cheerio from 'cheerio';

export default async function getTechniques () {
  console.info('Starting');
  try {
    console.info('Running');
    const result = await got('https://temtem.gamepedia.com/Category:Techniques');
    const $ = cheerio.load(result.body);
    const page = $('.mw-category').last();
    const techniques = page.find('a').map((_i, el) => {
      return {
        name: $(el).text().trim(),
        wikiUrl: `https://temtem.gamepedia.com${$(el).attr('href')}`
      }
    }).toArray();
    await fs.writeFile(path.join(__dirname, '..', '..', 'data', 'techniques.json'), JSON.stringify(techniques))
    return techniques;
  } catch (e) {
    console.error('Error', e.message)
  }
}