import url from "url";
import got from "got";
import cheerio from "cheerio";
import { typedToArray } from "../util/cheerioHelpers";

const types = require("../../data/types.json");

enum LocationType {
  ISLAND = "island",
  ROUTE = "route",
  TOWN_OR_VILLAGE = "townorvillage",
  LANDMARK = "landmark",
}

interface RawIsland {
  name: string;
  wikiUrl: string;
  description: string;
  temtemTypes: string[];
  type: LocationType;
}

export default async function getLocations() {
  const islands = await getIslands();
  const embellishedIsland = await Promise.all(islands.map(embellishIsland));
  return embellishedIsland;
}

async function getIslands() {
  const html = (await got("https://temtem.gamepedia.com/Airborne_Archipelago"))
    .body;
  const $ = cheerio.load(html);
  return typedToArray<{ name: string; wikiUrl: string; description: string }>(
    $("#Islands")
      .parent()
      .next()
      .find("li")
      .map((_i, el) => {
        const $name = $(el).find("a");
        const description = $(el).text();
        return {
          name: $name.text(),
          wikiUrl: `https://temtem.gamepedia.com${$name.attr("href")}`,
          description,
          temtemTypes: types
            .map(({ name }) => name)
            .filter((t) => description.includes(` ${t} `)),
          type: LocationType.ISLAND,
        };
      })
  );
}

async function embellishIsland(island: RawIsland) {
  const html = (await got(island.wikiUrl)).body;
  const $ = cheerio.load(html);
  return {
    ...island,
    ...getImage($),
    routes: attachType(getSectionList($, "Routes"), LocationType.ROUTE),
    townsAndVillages: attachType(
      getSectionList($, "Towns_and_Villages"),
      LocationType.TOWN_OR_VILLAGE
    ),
    landmarks: attachType(
      getSectionList($, "Landmarks"),
      LocationType.LANDMARK
    ),
    temtem: getSectionList($, "Temtem").map(({ name }) => name),
    trivia: getSectionList($, "Trivia", "li").map(({ name }) => name),
  };
}

function attachType(ar: any[], type: LocationType) {
  return ar.map((a) => ({ ...a, type }));
}

function getImage($: CheerioStatic) {
  const thumb = $(".thumbinner").first();
  const fileLink = thumb.find("a").attr("href");
  const thumbnail = thumb.find("img").attr("src");
  const parsedThumbnail = url.parse(thumbnail || "");
  return {
    imageWikiThumbnail: (thumbnail
      ? `${parsedThumbnail.protocol}//${parsedThumbnail.host}${parsedThumbnail.pathname}`
      : ""
    ).replace(/\/revision\/latest\/scale-to-width.*$/, ""),
    imageWikiFile: `https://temtem.gamepedia.com${fileLink}`,
  };
}

function getSectionList(
  $: CheerioStatic,
  name: string,
  detailEl: string = "a"
) {
  return typedToArray<{ name: string; wikiUrl: string }>(
    $(`#${name}`)
      .parent()
      .next()
      .find(detailEl)
      .map((_i, el) => ({
        name: $(el).text(),
        wikiUrl: `https://temtem.gamepedia.com${$(el).attr("href")}`,
      }))
  );
}
