import got from 'got';
import cheerio from 'cheerio';
import * as log from '../util/log';
import write from '../util/write';

export default async function getTraits () {
  log.info('Starting');
  try {
    log.info('Running');
    const result = await got('https://temtem.gamepedia.com/Category:Traits');
    const $ = cheerio.load(result.body);
    const page = $('#mw-pages');
    const traits = page.find('a').map((_i, el) => {
      return {
        name: $(el).text().trim(),
        wikiUrl: `https://temtem.gamepedia.com${$(el).attr('href')}`
      }
    }).toArray();
    await write('traits', traits);
    return traits;
  } catch (e) {
    log.error(e.message)
  }
}