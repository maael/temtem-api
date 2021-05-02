import got from "got";
import cheerio from "cheerio";
import { typedToArray } from "../util/cheerioHelpers";
import fetchHTML from "../util/fetchHTML";
import { Dojo } from "../checker/codecs/dojos";
import { Temtem } from "./embellishKnownTemtemSpecies";
import { Technique } from "./embellishTechniques";
import { Trait } from "./embellishTraits";

const BASE_URL = "https://temtem.gamepedia.com";

export default async function getDojos(
  temtem: Temtem[],
  techniques: Technique[],
  traits: Trait[]
): Promise<Dojo[]> {
  const basic = await getBasicList();
  const embellished = await embellishDojos(basic, temtem, techniques, traits);
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
        const links = typedToArray<{ text: string; url: string }>(
          $(el)
            .find("a")
            .map((_j, a) => {
              if (a.firstChild.tagName === "img") return;
              return {
                text: $(a).text().trim(),
                url: $(a).attr("href"),
              };
            })
        );
        const dojo: Dojo = {
          name: links[0].text,
          wikiUrl: `${BASE_URL}${links[0].url}`,
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
    const $ = cheerio.load(html);
    const temtemRows = $(`#${item.leader.name}.mw-headline`)
      .parent()
      .next("table")
      .children("tbody")
      .children("tr")
      .last()
      .find("td")
      .first()
      .find("table")
      .first()
      .find("tbody")
      .first()
      .children("tr")
      .children("td");
    const leaderTemtem = typedToArray<Dojo["leader"]["temtem"][0]>(
      $(temtemRows).map((_i, tem) => {
        const links = typedToArray<{
          text: string;
          url: string;
          title: string;
        }>(
          $(tem)
            .find("a")
            .map((_j, a) => {
              return {
                text: $(a).text().trim(),
                url: $(a).attr("href") || "",
                title: $(a).attr("tite") || "",
              };
            })
        );

        const matchedTemtem = links
          .map((l) => temtem.find((t) => t.name === l.text))
          .filter(Boolean)[0];

        if (!matchedTemtem) return;

        const level = parseInt(
          $(tem).find("small").eq(3).parent().text().replace("Lv.", "").trim(),
          10
        );
        const matchedTechniques = links
          .map((l) => techniques.find((t) => t.name === l.text))
          .filter(Boolean)
          .map((t) => (t ? t.name : ""))
          .filter(Boolean);
        const matchedTrait = links
          .map((l) => traits.find((t) => t.name === l.text))
          .filter(Boolean)[0];

        return {
          level: isNaN(level) ? 0 : level,
          name: matchedTemtem.name,
          number: matchedTemtem.number,
          trait: matchedTrait ? matchedTrait.name : "Unknown",
          techniques: matchedTechniques,
        };
      })
    );
    return { ...item, leader: { ...item.leader, temtem: leaderTemtem } };
  });
  return result;
}
