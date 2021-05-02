import path from "path";
import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";
import { stripQuerystring } from "../util/url";
import { Item } from "../checker/codecs/items";

export default async function getItems(): Promise<Item[]> {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.gamepedia.com/Items");
    const $ = cheerio.load(result.body);
    const generalItems = getItemTableWithDetails($, "#General", "general");
    const captureItems = getItemTableWithDetails($, "#Capture", "capture");
    const medicineItems = getItemTableWithDetails($, "#Medicine", "medicine");
    const gearItems = getSimpleItemTable($, "#Gear", "gear");
    const courseItems = getSimpleItemTable($, "#Courses", "course");
    const keyItems = getSimpleItemTable($, "#Key", "key");
    const questItems = getSimpleItemTable($, "#Key", "quest", 3);
    return [
      ...generalItems,
      ...captureItems,
      ...medicineItems,
      ...gearItems,
      ...courseItems,
      ...keyItems,
      ...questItems,
    ];
  } catch (e) {
    log.error(e.message, e);
    return [];
  }
}

function getItemTableWithDetails(
  $: CheerioStatic,
  selector: string,
  category: string
) {
  const header = $(selector).parent();
  const table = header.next().next();
  const rows = typedToArray<Item>(
    table.find("tr").map((_i, el) => {
      const cells = typedToArray<any>(
        $(el)
          .find("td")
          .map((_j, td) => {
            const $img = $(td).find("img");
            return {
              text: $(td).text(),
              href: $(td).find("a").attr("href"),
              src: stripQuerystring($img.attr("src") || ""),
            };
          })
      );
      if (cells.length === 0) return undefined;
      return {
        wikiImageUrl: cells[0].src || "",
        largeWikiImageUrl: (cells[0].src || "")
          .replace("/thumb/", "/")
          .replace(/.png.+/, ".png"),
        icon: `/images/icons/items/${path
          .parse(cells[0].src || "")
          .base.split("-")
          .pop()}`,
        name: cells[1].text,
        wikiUrl: `https://temtem.gamepedia.com${cells[1].href}`,
        description: cells[2].text,
        effect: null,
        location: null,
        buyPrice: parseInt(cells[3].text, 10) || null,
        sellPrice: parseInt(cells[4].text, 10) || null,
        quest: null,
        category,
      };
    })
  );
  return rows;
}

function getSimpleItemTable(
  $: CheerioStatic,
  selector: string,
  category: string,
  next: number = 2
) {
  const header = $(selector).parent();
  let table = header;
  for (let n = 0; n < next; n++) {
    table = table.next();
  }
  const rows = typedToArray<Item>(
    table.find("tr").map((_i, el) => {
      const cells = typedToArray<any>(
        $(el)
          .find("td")
          .map((_j, td) => {
            const $img = $(td).find("img");
            return {
              text: $(td).text(),
              href: $(td).find("a").attr("href"),
              src: stripQuerystring($img.attr("src") || ""),
            };
          })
      );
      if (cells.length === 0) return undefined;
      return {
        wikiImageUrl: cells[0].src || "",
        largeWikiImageUrl: (cells[0].src || "")
          .replace("/thumb/", "/")
          .replace(/.png.+/, ".png"),
        icon: `/images/icons/items/${path
          .parse(cells[0].src || "")
          .base.split("-")
          .pop()}`,
        name: cells[1].text,
        wikiUrl: `https://temtem.gamepedia.com/${cells[1].href}`,
        description: null,
        effect: cells[2].text || null,
        location: category === "quest" ? null : cells[3] ? cells[3].text : null,
        buyPrice: null,
        sellPrice: null,
        quest: category === "quest" ? (cells[3] ? cells[3].text : null) : null,
        category,
      };
    })
  );
  return rows;
}
