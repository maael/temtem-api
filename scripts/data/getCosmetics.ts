import url from "url";
import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";

export enum CosmeticType {
  HEAD = "head",
  TOP = "top",
  BOTTOM = "bottom",
  SET = "set",
  BAG = "bag",
}
export interface Cosmetic {
  type: CosmeticType;
  wikiImageUrl: string;
  wikiUrl: string;
  name: string;
  location: string;
  cost: number;
  requirement: string;
  description: string;
}

interface CosmeticCell {
  text: string;
  wikiUrl: string;
  wikiImageUrl: string;
}

export default async function getCosmetics() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.wiki.gg/wiki/Customization");
    const $ = cheerio.load(result.body);
    const all = [
      ...getItems($, "#Head", "head"),
      ...getItems($, "#Top", "top"),
      ...getItems($, "#Bottom", "bottom"),
      ...getItems($, "#Set", "set"),
      ...getItems($, "#Bag", "bag"),
    ];
    return all;
  } catch (e) {
    log.error(e.message);
  }
}

function getItems($, selector, type) {
  const parsedItems = typedToArray<Cosmetic>(
    $(selector)
      .parent()
      .next()
      .next()
      .find("tr")
      .map((i, el) => {
        if (i === 0) return undefined;
        const items = typedToArray<CosmeticCell>(
          $(el)
            .find("td")
            .map((_j, td) => ({
              text: $(td).text().trim(),
              wikiUrl: $(td).find("a").attr("href"),
              wikiImageUrl: $(td).find("img").attr("src"),
            }))
        );
        const imageParts = url.parse(items[0].wikiImageUrl || "");
        const parsedCost = parseInt(items[3].text.replace(/,/g, ""), 10);
        return {
          type,
          wikiImageUrl: items[0].wikiImageUrl
            ? `${imageParts.protocol}//${imageParts.host}${imageParts.pathname}`
            : "",
          wikiUrl: `https://temtem.wiki.gg${items[1].wikiUrl}`,
          name: items[1].text,
          location: items[2].text,
          cost: isNaN(parsedCost) ? 0 : parsedCost,
          requirement: isNaN(parsedCost) ? items[3].text : "",
          description: items[4].text,
        };
      })
  );
  return parsedItems;
}
