import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { cleanToNumber } from "../util/cleaners";
import { typedToArray } from "../util/cheerioHelpers";

const UNSAFE_NAME_REGEX = /\//;

export interface Temtem {
  number: number;
  name: string;
  types: string[];
  portraitWikiUrl: string;
  lumaPortraitWikiUrl: string;
  wikiUrl: string;
  stats: {
    hp: number;
    sta: number;
    spd: number;
    atk: number;
    def: number;
    spatk: number;
    spdef: number;
    total: number;
  };
}

export default async function getKnownTemtemSpecies() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.gamepedia.com/Temtem_Species");
    const $ = cheerio.load(result.body);
    const temRows = $("table.temtem-list>tbody>tr").filter((_i, el) => {
      return !!$(el).find("td").length;
    });
    log.info(`Found ${temRows.length} temtem`);
    // TODO: Probably check we only have 1 of each number
    const temtem = typedToArray<Temtem>(
      temRows.map((_i, row) => getTemInfoFromRow($, row))
    ).filter(
      ({ number: num, name }) => num !== 0 && !UNSAFE_NAME_REGEX.test(name)
    );
    log.info("Example received:", JSON.stringify(temtem[0]));
    return temtem;
  } catch (e) {
    log.error(e.message);
  } finally {
    log.info("Finished");
  }
}

function getTemInfoFromRow($, row): Temtem {
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
    lumaPortraitWikiUrl: "",
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
