import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";

export interface Character {
  name: string;
  wikiUrl: string;
}

export default async function getCharacters() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got(
      "https://temtem.gamepedia.com/Category:Characters"
    );
    const $ = cheerio.load(result.body);
    const page = $(".mw-category").last();
    const characters = typedToArray<Character>(
      page.find("a").map((_i, el) => {
        return {
          name: $(el).text().trim(),
          wikiUrl: `https://temtem.gamepedia.com${$(el).attr("href")}`,
        };
      })
    ).filter(({ name }) => !["Characters", "Characters/pt-br"].includes(name));
    return characters;
  } catch (e) {
    log.error(e.message);
  }
}
