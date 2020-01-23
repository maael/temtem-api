import got from 'got';
import cheerio from 'cheerio';
import * as log from '../util/log';
import write from '../util/write';

export default async function getKnownTemTemSpecies () {
  log.info('Starting');
  try {
    log.info('Running');
    const result = await got('https://temtem.gamepedia.com/Temtem_Species');
    const $ = cheerio.load(result.body);
    const temRows = $('table.temtem-list>tbody>tr').filter((_i, el) => {
      return !!$(el).find('td').length;
    });
    log.info(`Found ${temRows.length} tems`);
    const tems = temRows.map((_i, row) => getTemInfoFromRow($, row));
    log.info('Example received:', JSON.stringify(tems[0]));
    const ar = tems.toArray();
    await write('knownTemTemSpecies', ar);
    return ar;
  } catch (e) {
    log.error(e.message);
  } finally {
    log.info('Finished');
  }
};

function getTemInfoFromRow ($, row) {
  const basicStats = $(row).find('td').text().split('\n').map((t) => t.trim()).map((t) => isNaN(Number(t)) ? t : Number(t));
  const portraitWikiUrl = $(row).find('img').attr('src').trim().replace(/\?.*/, '');
  const tem = {
    number: basicStats[0],
    name: basicStats[1],
    types: [].concat(basicStats[2].replace(/(.)([A-Z])/g, '$1 $2').split(' ')),
    portraitWikiUrl,
    wikiUrl: `https://temtem.gamepedia.com/${basicStats[1]}`,
    stats: {
      hp: basicStats[3],
      sta: basicStats[4],
      spd: basicStats[5],
      atk: basicStats[6],
      def: basicStats[7],
      spatk: basicStats[8],
      spdef: basicStats[9],
      total: basicStats[10]
    }
  };
  return tem;
}