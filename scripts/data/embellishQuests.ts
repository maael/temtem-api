import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";
import fetchHTML from "../util/fetchHTML";

function getInfoBoxEl($: any, str: string) {
  return $(".infobox-row")
    .filter((_i, el) => {
      return !!$(el)
        .text()
        .includes(str);
    })
    .first()
    .find(".infobox-row-value")
    .last();
}

export default async function embellishQuests(quests: any) {
  log.info("Starting");
  const webpages = await fetchHTML("quests", quests, "wikiUrl");
  const embellished = webpages.map(({ item, html }) => {
    const $ = cheerio.load(html);
    const steps = $("#Objectives")
      .parent()
      .next()
      .find("b")
      .map((_i, b) => $(b).text())
      .toArray();
    const reward = getInfoBoxEl($, "Reward");
    const rewardItems = $(reward)
      .children()
      .map((_i, el) =>
        $(el)
          .text()
          .trim()
      )
      .toArray()
      .filter(Boolean);
    return {
      ...item,
      steps,
      rewards: rewardItems,
      startingLocation: getInfoBoxEl($, "Starting Location")
        .text()
        .trim(),
      startingNPC: getInfoBoxEl($, "Starting NPC")
        .text()
        .trim(),
      requirements: getInfoBoxEl($, "Requirements")
        .text()
        .trim()
    };
  });
  await write("quests", embellished);
  return embellished;
}
