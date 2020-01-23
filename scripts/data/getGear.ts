import got from 'got';
import cheerio from 'cheerio';
import * as log from '../util/log';
import write from '../util/write';

export default async function getGear () {
  log.info('Starting');
  try {
    log.info('Running');
    const result = await got('https://temtem.gamepedia.com/Category:Gear_Items');
    const $ = cheerio.load(result.body);
    const page = $('.mw-category').last();
    const gear = page.find('a').map((_i, el) => {
      return {
        name: $(el).text().trim(),
        wikiUrl: `https://temtem.gamepedia.com${$(el).attr('href')}`
      }
    }).toArray();
    await write('gear', gear);
    return gear;
  } catch (e) {
    log.error(e.message)
  }
}