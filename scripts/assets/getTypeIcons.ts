import path from "path";
import got from "got";
import cheerio from "cheerio";
import pipeFile from "../util/pipeFile";
import * as log from "../util/log";

export default async function getTypeIcons() {
  log.info("Starting");
  const result = await got("https://temtem.wiki.gg/wiki/Category:Type_icons");
  const $ = cheerio.load(result.body);
  const images = $("#mw-content-text")
    .find("img")
    .map((_i, el) => $(el).attr("src"))
    .toArray();
  await Promise.all(
    images.map(async (img) => {
      const p = path.parse((img as unknown) as string);
      let filename = `${p.name.split("-")[1]}${p.ext.split("?")[0]}`;
      if (filename === "UnknownType.png") {
        filename = "Unknown.png";
      }
      try {
        await pipeFile((img as unknown) as string, [
          "images",
          "icons",
          "types",
          filename,
        ]);
      } catch (e) {
        log.error(e.message);
      }
    })
  );
  log.info("Finished");
}
