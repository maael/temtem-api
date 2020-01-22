import {promises as fs} from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import throat from 'throat';
import got from 'got/dist/source';

const CONCURRENCY_LIMIT = 10;

function getInfoBox ($: any, str: string) {
  const text = $('.infobox-row').filter((_i, el) => {
    return !!$(el).text().includes(str);
  }).first().find('.infobox-row-value').last().text().trim();
  return isNaN(parseInt(text, 10)) ? text : parseInt(text, 10);
}

function getPriority ($: any) {
  const priority = $('.infobox-row').filter((_i, el) => {
    return !!$(el).text().includes('Priority');
  }).first().find('.infobox-row-value').last().html();
  if (!priority) return 'unknown';
  if (priority.includes('Priority_Ultra.png')) {
    return 'ultra';
  } else if (priority.includes('Priority_High.png')) {
    return 'high';
  } else if (priority.includes('Priority_VeryHigh.png')) {
    return 'veryhigh';
  } else if (priority.includes('Priority_Normal.png')) {
    return 'normal';
  } else if (priority.includes('Priority_Low.png')) {
    return 'low';
  } else if (priority.includes('Priority_VeryLow.png')) {
    return 'verylow';
  } else {
    return 'unknown';
  }
}

export default async function embellishTechniques (techniques: any) {
  console.info('Starting');
  try {
    console.info('Running');
    const webpages: any[] = await Promise.all(techniques.map(throat(CONCURRENCY_LIMIT, async (item) => {
      return {
        item,
        html: (await got((item as any).wikiUrl)).body
      }
    })));

    const result = webpages.map(({item, html}) => {
      const $ = cheerio.load(html);
      const hold = getInfoBox($, 'Hold');
      return {
        ...item,
        type: getInfoBox($, 'Type'),
        class: getInfoBox($, 'Class'),
        damage: getInfoBox($, 'Damage'),
        staminaCost: getInfoBox($, 'Stamina Cost'),
        hold: hold === 'None' ? 0 : hold,
        priority: getPriority($),
        syngery: getInfoBox($, 'Synergy'),
        synergyEffect: getInfoBox($, 'Synergy Effect'),
        targets: getInfoBox($, 'Targets'),
        description: $('#Description').parent().next().text().trim()
      }
    }).sort((a, b) => a.name.localeCompare(b.name));
    console.info('Technique', result[0]);

    await fs.writeFile(path.join(__dirname, '..', 'data', 'techniques.json'), JSON.stringify(result))
    return techniques;
  } catch (e) {
    console.error('Error', e.message);
  }
}