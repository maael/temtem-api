import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";
import fetchHTML from "../util/fetchHTML";

function getInfoBox($: any, str: string) {
  const text = $(".infobox-row")
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
  if (!priority) return "unknown";
  if (priority.includes("Priority_Ultra.png")) {
    return "ultra";
  } else if (priority.includes("Priority_High.png")) {
    return "high";
  } else if (priority.includes("Priority_VeryHigh.png")) {
    return "veryhigh";
  } else if (priority.includes("Priority_Normal.png")) {
    return "normal";
  } else if (priority.includes("Priority_Low.png")) {
    return "low";
  } else if (priority.includes("Priority_VeryLow.png")) {
    return "verylow";
  } else {
    return "unknown";
  }
}

export default async function embellishTechniques(techniques: any) {
  log.info("Starting");
  try {
    log.info("Running");
    const webpages = await fetchHTML("techniques", techniques, "wikiUrl");
    const result = webpages
      .map(({ item, html }) => {
        const $ = cheerio.load(html);
        const hold = getInfoBox($, "Hold");
        const synergyEffect = getInfoBox($, "Synergy Effect").replace(
          /^\-$/,
          ""
        );
        return {
          ...item,
          type: getInfoBox($, "Type"),
          class: getInfoBox($, "Class"),
          damage: getInfoBox($, "Damage"),
          staminaCost: getInfoBox($, "Stamina Cost"),
          hold: hold === "None" ? 0 : hold,
          priority: getPriority($),
          synergy: getInfoBox($, "Synergy"),
          synergyEffect:
            typeof synergyEffect === "number"
              ? `+${synergyEffect} damage`
              : synergyEffect,
          synergyEffectDamage:
            typeof synergyEffect === "number" ? synergyEffect : 0,
          targets: getInfoBox($, "Targets"),
          description: getDescription($)
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    log.info("Example received", JSON.stringify(result[0]));
    await write("techniques", result);
    return techniques;
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
