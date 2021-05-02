import cheerio from "cheerio";
import * as log from "../util/log";
import fetchHTML from "../util/fetchHTML";
import {
  Quest as MinimalQuest,
  MainQuest as MinimalMainQuest,
  SideQuest as MinimalSideQuest,
} from "./getQuests";

export type Quest = MainQuest | SideQuest;

export interface MainQuest extends MinimalMainQuest {
  steps: string[];
  rewards: string[];
  startingLocation: string;
  startingNPC: string;
  requirements: string;
}
export interface SideQuest extends MinimalSideQuest {
  steps: string[];
  rewards: string[];
  startingLocation: string;
  startingNPC: string;
  requirements: string;
}

function getInfoBoxEl($: any, str: string): Cheerio {
  return $(".infobox-row")
    .filter((_i, el) => {
      return !!$(el).text().includes(str);
    })
    .first()
    .find(".infobox-row-value")
    .last();
}

export default async function embellishQuests(quests: MinimalQuest[]) {
  log.info("Starting");
  const webpages = await fetchHTML("quests", quests, "wikiUrl");
  const embellished = webpages.map(({ item, html }) => {
    const $ = cheerio.load(html);
    const stepsContainer = $("#Objectives").parent().next();
    let steps = stepsContainer
      .find("b")
      .map((_i, b) => $(b).text())
      .toArray();
    if (steps.length === 0) {
      steps = stepsContainer
        .find("li")
        .map((_i, b) => $(b).text())
        .toArray();
    }
    const reward = getInfoBoxEl($, "Reward");
    const rewardItems = $(reward)
      .children()
      .map((_i, el) => $(el).text().trim())
      .toArray()
      .filter(Boolean);
    return {
      ...item,
      steps,
      rewards: rewardItems,
      startingLocation: getInfoBoxEl($, "Starting Location").text().trim(),
      startingNPC: getInfoBoxEl($, "Starting NPC").text().trim(),
      requirements: getInfoBoxEl($, "Requirements").text().trim(),
    };
  });
  return embellished;
}
