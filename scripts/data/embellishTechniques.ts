import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";
import fetchHTML from "../util/fetchHTML";
import { cleanToNumber } from "../util/cleaners";
import { Technique as MinimalTechnique } from "./getTechniques";

export enum TechniquePriority {
  ULTRA = "ultra",
  VERY_HIGH = "veryhigh",
  HIGH = "high",
  NORMAL = "normal",
  LOW = "low",
  VERY_LOW = "verylow",
  UNKNOWN = "unknown"
}
export interface Technique extends MinimalTechnique {
  type: string;
  class: string;
  damage: number;
  staminaCost: number;
  hold: number;
  priority: TechniquePriority;
  synergy: string;
  synergyEffect: string;
  synergyEffectDamage: number;
  targets: string;
  description: string;
}

function getInfoBox($: any, str: string): string {
  return $(".infobox-row")
    .filter((_i, el) => {
      return !!$(el)
        .text()
        .includes(str);
    })
    .first()
    .find(".infobox-row-value")
    .last()
    .text()
    .trim();
}

function getInfoBoxNumeric($: any, str: string): string | number {
  const text = getInfoBox($, str);
  return isNaN(parseInt(text, 10)) ? text : parseInt(text, 10);
}

function getPriority($: any) {
  const priority = $(".infobox-row")
    .filter((_i, el) => {
      return !!$(el)
        .text()
        .includes("Priority");
    })
    .first()
    .find(".infobox-row-value")
    .last()
    .html();
  if (!priority) return TechniquePriority.UNKNOWN;
  if (priority.includes("Priority_Ultra.png")) {
    return TechniquePriority.ULTRA;
  } else if (priority.includes("Priority_High.png")) {
    return TechniquePriority.HIGH;
  } else if (priority.includes("Priority_VeryHigh.png")) {
    return TechniquePriority.VERY_HIGH;
  } else if (priority.includes("Priority_Normal.png")) {
    return TechniquePriority.NORMAL;
  } else if (priority.includes("Priority_Low.png")) {
    return TechniquePriority.LOW;
  } else if (priority.includes("Priority_VeryLow.png")) {
    return TechniquePriority.VERY_LOW;
  } else {
    return TechniquePriority.UNKNOWN;
  }
}

export default async function embellishTechniques(
  techniques: MinimalTechnique[]
): Promise<Technique[] | undefined> {
  log.info("Starting");
  try {
    log.info("Running");
    const webpages = await fetchHTML("techniques", techniques, "wikiUrl");
    const result = webpages
      .map(({ item, html }) => {
        const $ = cheerio.load(html);
        const hold = getInfoBoxNumeric($, "Hold");
        const synergyEffect = getInfoBoxNumeric($, "Synergy Effect");
        const cleanedSynergyEffect =
          typeof synergyEffect === "string"
            ? synergyEffect.replace(/^\-$/, "")
            : synergyEffect;
        return {
          ...item,
          type: getInfoBox($, "Type"),
          class: getInfoBox($, "Class"),
          damage: cleanToNumber(getInfoBoxNumeric($, "Damage")),
          staminaCost: cleanToNumber(getInfoBoxNumeric($, "Stamina Cost")),
          hold: cleanToNumber(hold),
          priority: getPriority($),
          synergy: getInfoBox($, "Synergy"),
          /**
           * TODO: Fix this for when there are multiple synergy effects
           * TODO: like https://temtem.gamepedia.com/Tsunami (dmg + cold)
           * TODO: and cases like Water Cannon https://temtem.gamepedia.com/Water_Cannon
           * TODO: where it thinks it is damage when it is a condition
           * TODO: and https://temtem.gamepedia.com/Turbo_Choreography
           * TODO: where it is a team buff
           */
          synergyEffect:
            typeof cleanedSynergyEffect === "number"
              ? `+${cleanedSynergyEffect} damage`
              : cleanedSynergyEffect,
          synergyEffectDamage:
            typeof cleanedSynergyEffect === "number" ? cleanedSynergyEffect : 0,
          targets: getInfoBox($, "Targets"),
          description: getDescription($)
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    log.info("Example received", JSON.stringify(result[0]));
    await write("techniques", result);
    return result;
  } catch (e) {
    log.error(e.message);
  }
}

function getDescription($: any) {
  const description = $("#Description")
    .parent()
    .next()
    .text()
    .trim();
  return description === "Game Description[edit | edit source]"
    ? $("#Game_Description")
        .parent()
        .next()
        .text()
        .trim()
    : description;
}
