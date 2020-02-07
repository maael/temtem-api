import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";
import { typedToArray } from "../util/cheerioHelpers";

export enum QuestType {
  MAIN = "main",
  SIDE = "side"
}

export type Quest = MainQuest | SideQuest;

export interface MainQuest {
  name: string;
  wikiUrl: string;
  type: QuestType.MAIN;
}
export interface SideQuest {
  name: string;
  wikiUrl: string;
  island: string;
  location: string;
  requirements: string;
  reward: string;
  type: QuestType.SIDE;
}

export default async function getQuests() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got("https://temtem.gamepedia.com/Quests");
    const $ = cheerio.load(result.body);
    const page = $("#mw-content-text");
    const mainQuests = typedToArray<MainQuest>(
      page
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
            type: QuestType.MAIN
          };
        })
    );
    const sideQuests = typedToArray<SideQuest>(
      page
        .find("#Side_Quests_List")
        .parent()
        .next()
        .next()
        .find("tr")
        .map((_i, el) => {
          if ($(el).find("td").length === 0) return;
          const td = typedToArray<{ text: string; link?: string }>(
            $(el)
              .find("td")
              .map((_j, tdEl) => ({
                text: $(tdEl)
                  .text()
                  .trim(),
                link: `https://temtem.gamepedia.com${$(tdEl)
                  .find("a")
                  .attr("href")}`
              }))
          );
          return {
            name: td[0].text,
            wikiUrl: td[0].link,
            island: td[1].text,
            location: td[2].text,
            requirements: td[3].text,
            reward: td[4].text,
            type: QuestType.SIDE
          };
        })
    );
    const quests = [...mainQuests, ...sideQuests];
    log.info(`Got ${quests.length} quests`);
    await write("quests", quests);
    return quests;
  } catch (e) {
    log.error(e.message);
  }
}
