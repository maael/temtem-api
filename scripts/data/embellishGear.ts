import path from "path";
import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";
import fetchHTML from "../util/fetchHTML";
import { Gear as MinimalGear } from "./getGear";

export interface Gear extends MinimalGear {
  wikiIconUrl: string;
  icon: string;
  category: string;
  consumable: boolean;
  limitedQuantity: boolean;
  purchasable: boolean;
  buyPrice: number;
  description: string;
  gameDescription: string;
}

function getInfoBox($: any, str: string) {
  const text = $(".infobox-row")
    .filter((_i, el) => {
      return !!$(el)
        .text()
        .includes(str);
    })
    .first()
    .find(".infobox-row-value")
    .last()
    .text()
    .trim();
  return isNaN(parseInt(text, 10)) ? text : parseInt(text, 10);
}

export default async function embellishGear(
  gear: MinimalGear[]
): Promise<Gear[] | undefined> {
  log.info("Starting");
  try {
    log.info("Running");
    const webpages = await fetchHTML("gear", gear, "wikiUrl");
    const result = webpages
      .map(({ item, html }) => {
        const $ = cheerio.load(html);
        const wikiIconUrl = (
          ($("#mw-content-text>.mw-parser-output .infobox-table a")
            .html()!
            .match(/src="(.+?)"/) || [])[1] || ""
        ).split("?")[0];
        return {
          ...item,
          wikiIconUrl,
          icon: `/images/icons/gear/${path
            .parse(wikiIconUrl)
            .base.split("-")
            .pop()}`,
          category: getInfoBox($, "Category"),
          consumable: getInfoBox($, "Consumable") === "Yes",
          limitedQuantity: getInfoBox($, "Limited Quantity") === "Yes",
          purchasable: getInfoBox($, "Purchasable") === "Yes",
          buyPrice: getInfoBox($, "Buy Price") || 0,
          description: $("#mw-content-text>.mw-parser-output>p")
            .first()
            .text()
            .replace(/\n/g, "")
            .trim(),
          gameDescription: $("#Description")
            .parent()
            .next()
            .text()
            .replace(/\n/g, "")
            .trim()
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    log.info("Example received", JSON.stringify(result[0]));
    await write("gear", result);
    return result;
  } catch (e) {
    log.error(e.message);
  }
}
