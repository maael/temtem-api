import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";

export interface Condition {
  name: string;
  description: string;
  icon: string;
}

const iconSpecialCases: { [name: string]: string } = {
  Invigorated: "Vigorized",
};

export default async function getStatuses() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.wiki.gg/wiki/Status_Conditions");
    const $ = cheerio.load(result.body);
    const $page = $(".mw-parser-output").last();
    const statuses: Condition[] = [];
    $page.find(".mw-headline").each((i, el) => {
      if (i === 0) return;
      const description = $(el)
        .parent()
        .next("p")
        .text()
        .trim()
        .replace(/\n/g, "");
      const conditions = $(el)
        .text()
        .split(" and ")
        .map((c) => ({
          name: c.trim(),
          description,
          icon: `/images/icons/conditions/${
            iconSpecialCases[c.trim()] || c.trim()
          }.png`,
        }));
      statuses.push(...conditions);
    });
    return statuses.filter((s) => !s.name.endsWith("Status Conditions"));
  } catch (e) {
    log.error(e.message);
  }
}
