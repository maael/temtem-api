import url from "url";
import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";

export default async function getDyes() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.gamepedia.com/Dye");
    const $ = cheerio.load(result.body);
    const dyes = $("#Dyes")
      .parent()
      .next()
      .find("tr")
      .map((i, el) => {
        if (i === 0) return undefined;
        const tdItems = $(el)
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
          .toArray() as any;
        return {
          wikiImageUrl: tdItems[0].image,
          color: tdItems[0].color,
          name: tdItems[1].text,
          description: tdItems[2].text,
          bundles: tdItems[3].items
        };
      })
      .toArray();
    await write("dyes", dyes);
    return dyes;
  } catch (e) {
    log.error(e.message);
  }
}
