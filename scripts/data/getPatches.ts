import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";

let existing: any[] = [];
try {
  existing = require("../../data/patches.json");
} catch {
  // Do nothing
}

export default async function getPatches() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://crema.gg/category/temtem/");
    const $ = cheerio.load(result.body);
    const patches = $("#main .category-patch-notes .entry-title a")
      .map((_i, el) => {
        const potentialVersion = $(el)
          .text()
          .match(/\d+\.\d+(.\d+)?/);
        return {
          name: $(el).text(),
          version: potentialVersion
            ? potentialVersion[0]
            : $(el)
                .text()
                .trim(),
          url: $(el).attr("href"),
          date: $(el)
            .parent()
            .next(".entry-meta")
            .text()
            .trim()
        };
      })
      .toArray();
    const existingNames = existing.map(({ name }) => name);
    const toWrite = patches
      .filter(({ name }) => !existingNames.includes(name))
      .concat(existing);
    await write("patches", toWrite);
    return patches;
  } catch (e) {
    log.error(e.message);
  }
}
