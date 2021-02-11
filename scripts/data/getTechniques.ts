import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";

export interface Technique {
  name: string;
  wikiUrl: string;
}

export default async function getTechniques() {
  log.info("Starting");
  let techniques: Technique[] = [];
  let nextPage: string | undefined =
    "https://temtem.gamepedia.com/Category:Techniques";
  while (!!nextPage) {
    const page = await getTechniquesForPage(nextPage);
    if (page) {
      techniques = techniques.concat(page.techniques);
      nextPage = page.nextPage;
    } else {
      nextPage = undefined;
    }
  }
  return techniques.filter(({ name }) => !name.endsWith("/de"));
}

async function getTechniquesForPage(url: string) {
  try {
    log.info("Running");
    const result = await got(url);
    const $ = cheerio.load(result.body);
    const page = $(".mw-category").last();
    const techniques = typedToArray<Technique>(
      page.find("a").map((_i, el) => {
        return {
          name: $(el)
            .text()
            .trim(),
          wikiUrl: `https://temtem.gamepedia.com${$(el).attr("href")}`
        };
      })
    ).filter(
      ({ name, wikiUrl }) =>
        name !== "Technique Course" &&
        name !== "Training Course" &&
        wikiUrl !== "https://temtem.gamepedia.com/Technique_Course"
    );
    const nextPage = typedToArray<string | undefined>(
      $("#mw-pages>a").map((_i, el) => {
        return $(el)
          .text()
          .trim()
          .toLowerCase() === "next page"
          ? `https://temtem.gamepedia.com${$(el).attr("href")}`
          : undefined;
      })
    ).filter(Boolean)[0];
    return { techniques, nextPage };
  } catch (e) {
    log.error(e.message);
  }
}
