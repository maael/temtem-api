import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";

export interface Gear {
  name: string;
  wikiUrl: string;
}

export default async function getGear() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.wiki.gg/wiki/Category:Gear_Items");
    const $ = cheerio.load(result.body);
    const page = $(".mw-category").last();
    const gear = typedToArray<Gear>(
      page.find("a").map((_i, el) => {
        return {
          name: $(el).text().trim(),
          wikiUrl: `https://temtem.wiki.gg${$(el).attr("href")}`,
        };
      })
    );
    return gear;
  } catch (e) {
    log.error(e.message);
  }
}
