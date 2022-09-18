import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";

export interface Trait {
  name: string;
  wikiUrl: string;
}

export default async function getTraits() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.wiki.gg/wiki/Category:Traits");
    const $ = cheerio.load(result.body);
    const page = $("#mw-pages");
    const traits = typedToArray<Trait>(
      page.find("a").map((_i, el) => {
        return {
          name: $(el).text().trim(),
          wikiUrl: `https://temtem.wiki.gg${$(el).attr("href")}`,
        };
      })
    );
    return traits;
  } catch (e) {
    log.error(e.message);
  }
}
