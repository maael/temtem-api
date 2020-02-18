import cheerio from "cheerio";
import * as log from "../util/log";
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

export enum SynergyType {
  DAMAGE = "damage",
  BUFF = "buff",
  DEBUFF = "debuff",
  CONDITION = "condition",
  PRIORITY = "priority",
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
  synergyEffects: Array<{ damage: number; effect: string }>;
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
        return {
          ...item,
          type: getInfoBox($, "Type"),
          class: getInfoBox($, "Class"),
          damage: cleanToNumber(getInfoBoxNumeric($, "Damage")),
          staminaCost: cleanToNumber(getInfoBoxNumeric($, "Stamina Cost")),
          hold: cleanToNumber(hold),
          priority: getPriority($),
          ...getSynergyData($),
          targets: getInfoBox($, "Targets"),
          description: getDescription($)
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    log.info("Example received", JSON.stringify(result[0]));
    return result;
  } catch (e) {
    log.error(e.message);
  }
}

function getSynergyData($: CheerioStatic) {
  const synergyEffects = getInfoBox($, "Synergy Effect")
    .split("\n")
    .map(e => e.split(","))
    .reduce((acc, pre) => [...acc, ...pre], [])
    .map(e => e.trim())
    .filter(e => e && !["-", "?"].includes(e));
  return {
    synergy: getInfoBox($, "Synergy"),
    synergyEffects: synergyEffects.map(processSynergyEffect)
  };
}

function processSynergyEffect(text: string) {
  const synergyEffectNumeric = isNaN(parseInt(text, 10))
    ? text
    : parseInt(text, 10);
  const type = getSynergyEffectType(text);
  const cleanedSynergyEffect =
    typeof synergyEffectNumeric === "string"
      ? synergyEffectNumeric.replace(/^\-$/, "")
      : synergyEffectNumeric;
  return {
    effect: text,
    type,
    damage:
      type === SynergyType.DAMAGE
        ? typeof cleanedSynergyEffect === "number"
          ? cleanedSynergyEffect
          : 0
        : 0
  };
}

function getSynergyEffectType(text: string) {
  const ltext = text.toLowerCase();
  if (
    ltext.includes("damage") ||
    ltext.includes("dmg") ||
    ltext.includes("power")
  ) {
    return SynergyType.DAMAGE;
  } else if (ltext.includes("priority")) {
    return SynergyType.PRIORITY;
  } else if (
    ltext.includes("status") ||
    ltext.includes("apply") ||
    ltext.includes("turn")
  ) {
    return SynergyType.CONDITION;
  } else if (
    ltext.includes("stamina") ||
    ltext.includes("sta") ||
    (ltext.includes("spd") && ltext.includes("+"))
  ) {
    return SynergyType.BUFF;
  } else if (
    ltext.includes("targets get") ||
    (ltext.includes("spd") && ltext.includes("-"))
  ) {
    return SynergyType.DEBUFF;
  } else {
    return SynergyType.UNKNOWN;
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
