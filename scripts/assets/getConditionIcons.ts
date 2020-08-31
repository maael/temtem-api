import got from "got";
import cheerio from "cheerio";
import pipeFile from "../util/pipeFile";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";

export default async function getConditionIcons() {
  log.info("Starting");
  const result = await got(
    "https://temtem.gamepedia.com/Category:Condition_icons"
  );
  const $ = cheerio.load(result.body);
  const images = typedToArray<{ src: string; name: string }>(
    $("#mw-content-text")
      .find("img")
      .map((_i, el) => ({
        src: $(el).attr("src"),
        name: $(el).attr("alt") || ""
      }))
  );
  await Promise.all(
    images.map(async img => {
      try {
        await pipeFile(img.src, ["images", "icons", "conditions", img.name]);
      } catch (e) {
        log.error(e.message);
      }
    })
  );
  log.info("Finished");
}
