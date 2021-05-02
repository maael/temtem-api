import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";

export interface Patch {
  name: string;
  version: string;
  url: string;
  date: string;
}

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
    const patches = typedToArray<Patch>(
      $("#main .category-patch-notes .entry-title a").map((_i, el) => {
        const potentialVersion = $(el)
          .text()
          .match(/\d+\.\d+(.\d+)?/);
        return {
          name: $(el).text(),
          version: potentialVersion ? potentialVersion[0] : $(el).text().trim(),
          url: $(el).attr("href"),
          date: getFormattedDate($, el),
        };
      })
    );
    const existingNames = existing.map(({ name }) => name);
    const toWrite = patches
      .filter(({ name }) => !existingNames.includes(name))
      .concat(existing);
    return toWrite;
  } catch (e) {
    log.error(e.message);
  }
}

const monthMap = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 11,
};

function getFormattedDate($: any, el: any) {
  const rawDate = $(el).parent().next(".entry-meta").text().trim();
  const potentialDate = Object.entries(monthMap)
    .reduce((acc, [month, num]) => {
      return acc.replace(month, num);
    }, rawDate)
    .replace(/[a-z]/g, "")
    .split(" ")
    .reverse()
    .join("-");
  return potentialDate;
}
