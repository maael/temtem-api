import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";
import fetchHTML from "../util/fetchHTML";

export default async function getTraits(traits: any) {
  log.info("Starting");
  try {
    log.info("Running");
    const webpages = await fetchHTML("traits", traits, "wikiUrl");
    const result = webpages
      .map(({ item, html }) => {
        const $ = cheerio.load(html);
        return {
          ...item,
          description: $("#In-Game_Description")
            .parent()
            .next()
            .text()
            .trim()
            .replace(/\\n/g, "")
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    await write("traits", result);
    return traits;
  } catch (e) {
    log.error(e.message);
  }
}
