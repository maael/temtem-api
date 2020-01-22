import {promises as fs} from 'fs';
import path from 'path';
import got from 'got';
import cheerio from 'cheerio';

const ordering = [
  'Neutral',
  'Fire',
  'Water',
  'Nature',
  'Electric',
  'Earth',
  'Mental',
  'Wind',
  'Digital',
  'Melee',
  'Crystal',
  'Toxic'
]

export default async function getWeaknessTable () {
  try {
    const res = await got('https://temtem.gamepedia.com/Temtem_Types#Strengths_and_Weaknesses');
    const $ = cheerio.load(res.body);
    const $table = $('#ttw-type-interactions-dynamic');
    const table: any = {};
    $table.find('tbody').children('tr').each((i, el) => {
      if (i === 0) return;
      const row: any = {};
      $(el).children('td').each((j, td) => {
        const value = Number($(td).text().trim().replace('x', ''));
        row[ordering[j]] = value === 0 ? 1 : value;
      });
      table[ordering[i - 1]] = row;
    });
    await fs.writeFile(path.join(__dirname, '..', '..', 'data', 'weaknesses.json'), JSON.stringify(table))
  } catch (e) {
    console.error('Error', e.message);
  }
}