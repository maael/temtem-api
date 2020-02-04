import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";

export default async function getQuests() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.gamepedia.com/Quests");
    const $ = cheerio.load(result.body);
    const page = $("#mw-content-text");
    const mainQuests = page
      .find("#Main_Quest_List")
      .parent()
      .next("ol")
      .find("li")
      .map((_i, el) => {
        const name = $(el).text();
        const wikiUrl = `https://temtem.gamepedia.com${$(el)
          .find("a")
          .attr("href")}`;
        return {
          name,
          wikiUrl,
          type: "main"
        };
      })
      .toArray();
    const sideQuests = page
      .find("#Side_Quests_List")
      .parent()
      .next()
      .next()
      .find("tr")
      .map((_i, el) => {
        if ($(el).find("td").length === 0) return;
        const td = ($(el)
          .find("td")
          .map((_j, td) => ({
            text: $(td)
              .text()
              .trim(),
            link: `https://temtem.gamepedia.com${$(td)
              .find("a")
              .attr("href")}`
          }))
          .toArray() as unknown) as Array<{ text: string; link?: string }>;
        return {
          name: td[0].text,
          wikiUrl: td[0].link,
          island: td[1].text,
          location: td[2].text,
          requirements: td[3].text,
          reward: td[4].text,
          type: "side"
        };
      })
      .toArray()
      .filter(Boolean);
    const quests = [...mainQuests, ...sideQuests];
    log.info(`Got ${quests.length} quests`);
    await write("quests", quests);
    return quests;
  } catch (e) {
    log.error(e.message);
  }
}
