import url from "url";
import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";

export interface Dye {
  wikiImageUrl: string;
  color: string;
  name: string;
  description: string;
  bundles: string[];
}

interface DyeCell {
  color: string;
  image: string;
  text: string;
  items: string[];
}

export default async function getDyes() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.gamepedia.com/Dye");
    const $ = cheerio.load(result.body);
    const dyes = typedToArray<Dye>(
      $("#Dyes")
        .parent()
        .next()
        .find("tr")
        .map((i, el) => {
          if (i === 0) return undefined;
          const tdItems = typedToArray<DyeCell>(
            $(el)
              .find("td")
              .map((_j, td) => {
                const style = $(td).attr("style") || "";
                const colorMatches = style.match(/(#\w{3,6})/);
                const color = colorMatches ? colorMatches[0] : "";
                const text = $(td)
                  .text()
                  .trim();
                const image = $(td)
                  .find("img")
                  .attr("src");
                const imageParts = url.parse(image || "");
                const items = $(td)
                  .find("a")
                  .map((_k, a) =>
                    $(a)
                      .text()
                      .trim()
                  )
                  .toArray();
                return {
                  color,
                  image: `${imageParts.protocol}://${imageParts.host}${imageParts.pathname}`,
                  text,
                  items
                };
              })
          );
          return {
            wikiImageUrl: tdItems[0].image,
            color: tdItems[0].color,
            name: tdItems[1].text,
            description: tdItems[2].text,
            bundles: tdItems[3].items
          };
        })
    );
    return dyes;
  } catch (e) {
    log.error(e.message);
  }
}
