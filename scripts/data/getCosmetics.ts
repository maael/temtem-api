import url from "url";
import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";

export default async function getCosmetics() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.gamepedia.com/Customization");
    const $ = cheerio.load(result.body);
    const all = [
      ...getItems($, "#Head", "head"),
      ...getItems($, "#Top", "top"),
      ...getItems($, "#Bottom", "bottom"),
      ...getItems($, "#Set", "set"),
      ...getItems($, "#Bag", "bag")
    ];
    await write("cosmetics", all);
    return all;
  } catch (e) {
    log.error(e.message);
  }
}

function getItems($, selector, type) {
  const parsedItems = $(selector)
    .parent()
    .next()
    .next()
    .find("tr")
    .map((i, el) => {
      if (i === 0) return undefined;
      const items = $(el)
        .find("td")
        .map((_j, td) => ({
          text: $(td)
            .text()
            .trim(),
          wikiUrl: $(td)
            .find("a")
            .attr("href"),
          wikiImageUrl: $(td)
            .find("img")
            .attr("src")
        }))
        .toArray();
      const imageParts = url.parse(items[0].wikiImageUrl || "");
      const parsedCost = parseInt(items[3].text, 10);
      return {
        type,
        wikiImageUrl: `${imageParts.protocol}://${imageParts.host}${imageParts.pathname}`,
        wikiUrl: `https://temtem.gamepedia.com${items[1].wikiUrl}`,
        name: items[1].text,
        location: items[2].text,
        cost: isNaN(parsedCost) ? 0 : parsedCost,
        requirement: isNaN(parsedCost) ? items[3].text : "",
        description: items[4].text
      };
    })
    .toArray()
    .filter(Boolean);
  return parsedItems;
}
