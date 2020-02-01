import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";
import { cleanToNumber } from "../util/cleaners";

export default async function getKnownTemtemSpecies() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.gamepedia.com/Temtem_Species");
    const $ = cheerio.load(result.body);
    const temRows = $("table.temtem-list>tbody>tr").filter((_i, el) => {
      return !!$(el).find("td").length;
    });
    log.info(`Found ${temRows.length} tems`);
    const tems = (temRows
      .map((_i, row) => getTemInfoFromRow($, row))
      .toArray() as any).filter(({ number: num }) => num !== 0);
    log.info("Example received:", JSON.stringify(tems[0]));
    await write("knownTemtemSpecies", tems);
    return tems;
  } catch (e) {
    log.error(e.message);
  } finally {
    log.info("Finished");
  }
}

function getTemInfoFromRow($, row) {
  const basicStats = $(row)
    .find("td")
    .text()
    .split("\n")
    .map(t => t.trim())
    .map(t => (isNaN(Number(t)) ? t : Number(t)));
  const portraitWikiUrl = $(row)
    .find("img")
    .attr("src")
    .trim()
    .replace(/\?.*/, "");
  const tem = {
    number: basicStats[0],
    name: basicStats[1],
    types: [].concat(basicStats[2].replace(/(.)([A-Z])/g, "$1 $2").split(" ")),
    portraitWikiUrl,
    wikiUrl: `https://temtem.gamepedia.com/${basicStats[1]}`,
    stats: {
      hp: cleanToNumber(basicStats[3]),
      sta: cleanToNumber(basicStats[4]),
      spd: cleanToNumber(basicStats[5]),
      atk: cleanToNumber(basicStats[6]),
      def: cleanToNumber(basicStats[7]),
      spatk: cleanToNumber(basicStats[8]),
      spdef: cleanToNumber(basicStats[9]),
      total: cleanToNumber(basicStats[10])
    }
  };
  return tem;
}
