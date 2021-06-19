import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";
import fetchHTML from "../util/fetchHTML";
import { Dojo } from "../checker/codecs/dojos";
import { Temtem } from "./embellishKnownTemtemSpecies";
import { Technique } from "./embellishTechniques";
import { Trait } from "./embellishTraits";
import { cleanStrings } from "../util/objectCleaner";

const BASE_URL = "https://temtem.gamepedia.com";

export default async function getDojos(
  temtem: Temtem[],
  techniques: Technique[],
  traits: Trait[]
): Promise<Dojo[]> {
  log.info("[start] Basic dojos");
  const basic = await getBasicList();
  log.info("[start] Embellish dojos");
  const embellished = await embellishDojos(basic, temtem, techniques, traits);
  log.info("[start] Finish dojos");
  return embellished;
}

async function getBasicList() {
  const result = await got(`${BASE_URL}/Dojo`);
  const $ = cheerio.load(result.body);
  const results = typedToArray<Dojo>(
    $("#Dojos")
      .parent()
      .next("ul")
      .find("li")
      .map((_i, el) => {
        const links =
          typedToArray<{ text: string; url: string }>(
            $(el)
              .find("a")
              .map((_j, a) => {
                if (a.firstChild.tagName === "img") return;
                return {
                  text: $(a).text().trim(),
                  url: $(a).attr("href"),
                };
              })
          ) || [];
        const dojo: Dojo = {
          name: links[0]?.text || "",
          wikiUrl: `${BASE_URL}${links[0]?.url}`,
          types: links
            .slice(2)
            .map(({ text }) => text)
            .filter(Boolean),
          leader: {
            name: links[1].text,
            temtem: [],
          },
        };
        return dojo;
      })
  );

  return results;
}

async function embellishDojos(
  basicDojos: Dojo[],
  temtem: Temtem[],
  techniques: Technique[],
  traits: Trait[]
) {
  const fetched = await fetchHTML("dojos", basicDojos, "wikiUrl");
  const result = fetched.map(({ item, html }) => {
    log.info("[start] Embellish dojo", item.name);
    const $ = cheerio.load(html);
    const temtemItems = getTemtem($, item.leader.name);
    log.info("[start] Get dojo leader temtem");
    const leaderTemtem = temtemItems.map((i) => {
      const tem = temtem.find((t) => t.name === i.name);
      const trait = traits.find((t) => t.name === i.trait);
      const confirmedTechniques = i.techniques.filter((t) =>
        techniques.some((tech) => tech.name === t)
      );
      return {
        ...i,
        name: tem?.name || "",
        number: tem?.number || 0,
        trait: trait?.name || "",
        techniques: confirmedTechniques,
      };
    });
    log.info("[finish] Get dojo leader temtem");
    return { ...item, leader: { ...item.leader, temtem: leaderTemtem } };
  });
  return result;
}

function getTemtem($: CheerioStatic, leader: string) {
  let temtemItems: any = [];
  let $temtemTable: any = null;
  try {
    $temtemTable = $(`#${leader}.mw-headline`).parent().next("table");
    temtemItems = $temtemTable.find(".partymember-main");
  } catch (e) {
    log.error("[error] Problem getting temtem list", e.message);
    return [];
  }
  log.info(`Found ${temtemItems.length} temtem`);
  return typedToArray<{
    name: string;
    level: number;
    trait: string;
    techniques: string[];
  }>(
    $(temtemItems).map((_i, el) => {
      const name = $(el).find(".temtemPortrait a").attr("title");
      const levelRaw = $(el)
        .find(".temtemPortrait")
        .parent()
        .parent()
        .parent()
        .find("tr")
        .last()
        .text()
        .trim();
      const level = levelRaw ? Number(levelRaw.split("Lv.").pop()?.trim()) : 0;
      const items = typedToArray<{ title: string; value: string }>(
        $(el)
          .find(".partymember-border")
          .map((_j, itemEl) => {
            return {
              title: $(itemEl).find("tr").first().text().trim(),
              value: cleanStrings($(itemEl).find("tr").last().text().trim()),
            };
          })
      );
      const traitMatch = items.find((i) => i.title === "Trait");
      const techniques = typedToArray(
        $(el)
          .find("tbody")
          .first()
          .children()
          .last()
          .map((_j, techEl) => {
            return cleanStrings($(techEl).text().trim())
              .replace("(+)", "")
              .trim();
          })
      );
      return {
        name,
        level: isNaN(level) ? 0 : level,
        trait: traitMatch && traitMatch.value !== "???" ? traitMatch.value : "",
        techniques,
      };
    })
  );
}
