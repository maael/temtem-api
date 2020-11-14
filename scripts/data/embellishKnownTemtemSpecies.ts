import path from "path";
import cheerio from "cheerio";
import glob from "glob";
import * as log from "../util/log";
import fetchHTML from "../util/fetchHTML";
import { cleanToNumber } from "../util/cleaners";
import { typedToArray } from "../util/cheerioHelpers";
import { Temtem as MinimalTemtem } from "./getKnownTemtemSpecies";

export enum TechniqueSource {
  LEVELLING = "Levelling",
  TRAINING_COURSE = "TechniqueCourses",
  BREEDING = "Breeding"
}

export enum TemtemEvolutionType {
  LEVEL = "level",
  SPECIAL = "special"
}

export interface TemtemTechnique {
  name: string;
  source: TechniqueSource;
}

export interface TemtemLocation {
  location: string;
  place: string;
  note: string;
  island: string;
  frequency: string;
  level: string;
  freetem: TemtemLocationFreetem;
}

export interface TemtemLocationFreetem {
  minLevel: number;
  maxLevel: number;
  minPansuns: number;
  maxPansuns: number;
}

export interface TemtemEvolutionTree {
  number: number;
  name: string;
  stage: number;
}

export interface TemtemEvolution {
  stage?: number;
  evolutionTree?: TemtemEvolutionTree[];
  evolves?: true;
  type: TemtemEvolutionType;
  description?: string;
}

export interface TemtemNoEvolution {
  evolves: false;
}

export interface Temtem extends MinimalTemtem {
  traits: string[];
  details: {
    height: {
      cm: number;
      inches: number;
    };
    weight: {
      kg: number;
      lbs: number;
    };
  };
  techniques: TemtemTechnique[];
  trivia: string[];
  evolution: TemtemEvolution | TemtemNoEvolution;
  wikiPortraitUrlLarge: string;
  lumaWikiPortraitUrlLarge: string;
  locations: TemtemLocation[];
  icon: string;
  lumaIcon: string;
  genderRatio: {
    male: number;
    female: number;
  };
  catchRate: number;
  hatchMins: number;
  tvYields: Record<keyof Omit<MinimalTemtem["stats"], "total">, number>;
  gameDescription: string;
  wikiRenderStaticUrl: string;
  wikiRenderAnimatedUrl: string;
  wikiRenderStaticLumaUrl: string;
  wikiRenderAnimatedLumaUrl: string;
  renderStaticImage: string;
  renderStaticLumaImage: string;
  renderAnimatedImage: string;
  renderAnimatedLumaImage: string;
}

async function asyncGlob(p: string) {
  return new Promise<string[]>((resolve, reject) => {
    glob(p, (err, matches) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(matches);
      return;
    });
  });
}

export default async function embellishKnownTemtemSpecies(
  ar: MinimalTemtem[]
): Promise<Temtem[] | undefined> {
  log.info(`Embellishing ${ar.length} tems`);
  try {
    const webpages = await fetchHTML("temtem", ar, "name", true);
    const icons = await asyncGlob(
      path.join(
        __dirname,
        "..",
        "..",
        "public",
        "images",
        "portraits",
        "temtem",
        "**/*.png"
      )
    );
    const result = webpages
      .map(({ item, html }) => {
        const catchRate = getCatchRate(html);
        const renderedImages = getRenderImages(html);
        const icon = `/images/portraits/temtem/large/${item.name}.png`;
        const lumaIcon = `/images/portraits/temtem/luma/large/${item.name}.png`;
        return {
          ...item,
          traits: getTraits(html),
          details: getDetails(html),
          techniques: getTechniques(html),
          trivia: getTrivia(html),
          evolution: getEvolutionInfo(ar, item, html),
          wikiPortraitUrlLarge: getWikiPortraitUrl(html),
          lumaWikiPortraitUrlLarge: getWikiLumaPortraitUrl(html),
          locations: getLocations(html),
          icon: icons.some(i => i.endsWith(icon)) ? icon : "",
          lumaIcon: icons.some(i => i.endsWith(lumaIcon)) ? lumaIcon : "",
          genderRatio: getGenderRatio(html),
          catchRate,
          hatchMins: calculateHatchMins(catchRate),
          tvYields: getTvYield(html),
          gameDescription: getGameDescription(html),
          wikiRenderStaticUrl: renderedImages.static.normal,
          wikiRenderAnimatedUrl: renderedImages.animated.normal,
          wikiRenderStaticLumaUrl: renderedImages.static.luma,
          wikiRenderAnimatedLumaUrl: renderedImages.animated.luma,
          renderStaticImage: renderedImages.static.normal
            ? `/images/renders/temtem/static/${item.name}.png`
            : "",
          renderStaticLumaImage: renderedImages.static.luma
            ? `/images/renders/temtem/luma/static/${item.name}.png`
            : "",
          renderAnimatedImage: renderedImages.animated.normal
            ? `/images/renders/temtem/animated/${item.name}.gif`
            : "",
          renderAnimatedLumaImage: renderedImages.animated.luma
            ? `/images/renders/temtem/luma/animated/${item.name}.gif`
            : ""
        };
      })
      .sort((a, b) => a.number - b.number);
    return result;
  } catch (e) {
    log.error(e);
  }
}

function getRenderImages(html: string, debug: boolean = false) {
  const $ = cheerio.load(html);
  const staticImages = typedToArray<{ luma: boolean; url: string }>(
    $("a[href*=full_render]").map((_i, el) => {
      const originalUrl = (
        $(el)
          .find("img")
          .attr("src") || ""
      ).replace("/thumb/", "/");
      return {
        luma: ($(el).attr("href") || "").includes("/File:Luma"),
        url: originalUrl
          .replace(`/${path.parse(originalUrl).name}`, "")
          .replace(".png.png", ".png")
          .replace(".gif.gif", ".gif")
          .replace(/\/revision\/latest\/scale-to-width.*$/, "")
      };
    })
  ).reduce(
    (acc, { luma, url }) => ({ ...acc, [luma ? "luma" : "normal"]: url }),
    { normal: "", luma: "" }
  );
  if (debug) {
    console.info("static", staticImages);
  }
  const animatedImages = typedToArray<{ luma: boolean; url: string }>(
    $("a[href*=idle_animation]").map((_i, el) => {
      const originalUrl = (
        $(el)
          .find("img")
          .attr("src") || ""
      ).replace("/thumb/", "/");
      return {
        luma: ($(el).attr("href") || "").includes("/File:Luma"),
        url: originalUrl
          .replace(`/${path.parse(originalUrl).name}`, "")
          .replace(".png.png", ".png")
          .replace(".gif.gif", ".gif")
          .replace(/\/revision\/latest\/scale-to-width.*$/, "")
      };
    })
  ).reduce(
    (acc, { luma, url }) => ({ ...acc, [luma ? "luma" : "normal"]: url }),
    { normal: "", luma: "" }
  );
  if (debug) {
    console.info("animated", animatedImages);
  }
  return {
    static: {
      normal: staticImages.normal || staticImages.luma,
      luma: staticImages.luma || staticImages.normal
    },
    animated: {
      normal: animatedImages.normal || animatedImages.luma,
      luma: animatedImages.luma || animatedImages.normal
    }
  };
}

function calculateHatchMins(catchRate: number) {
  return 40 - catchRate / 5 + 5;
}

function getLocations(html: string) {
  const $ = cheerio.load(html);
  const locations = typedToArray<TemtemLocation>(
    $("#Location")
      .parent()
      .next("table")
      .find("tbody>tr")
      .map((_i, row) => {
        const cells = $(row).find("td");
        const item = (cells
          .map((_j, cell) => {
            return $(cell)
              .text()
              .trim();
          })
          .toArray() as unknown) as string[];
        // tslint:disable-next-line:strict-type-predicates
        if (item[0] === undefined || item.every(i => i === "?"))
          return undefined;
        const tidiedLocation = (item[0] || "").replace(
          /([a-z])([A-Z])/g,
          "$1, $2"
        );
        return {
          location: tidiedLocation,
          place: "",
          note: "",
          island: item[1],
          frequency: (item[2] || "")
            .replace(/\[\d+\]/, "")
            .replace("?", "")
            .trim(),
          level: (item[3] || "")
            .replace(/\[\d+\]/, "")
            .replace("?", "")
            .trim(),
          freetem: {
            minLevel: 0,
            maxLevel: 0,
            minPansuns: 0,
            maxPansuns: 0
          }
        };
      })
  );
  return locations;
}

function getWikiPortraitUrl(html: string) {
  const $ = cheerio.load(html);
  return (
    $("#mw-content-text .infobox-table #ttw-temtem img")
      .first()
      .attr("src") || ""
  ).replace(/\/revision\/latest\/scale-to-width.*$/, "");
}

function getWikiLumaPortraitUrl(html: string) {
  const $ = cheerio.load(html);
  return (
    $("#mw-content-text .infobox-table #ttw-temtem-luma img")
      .first()
      .attr("src") || ""
  ).replace(/\/revision\/latest\/scale-to-width.*$/, "");
}

function getCatchRate(html: string) {
  const $ = cheerio.load(html);
  const catchRate = $(".infobox-row-name")
    .filter((_i, el) => {
      return (
        $(el)
          .text()
          .trim()
          .toLowerCase() === "catch rate"
      );
    })
    .parent()
    .find(".infobox-row-value")
    .last()
    .text()
    .trim();
  return isNaN(parseInt(catchRate, 10)) ? 200 : parseInt(catchRate, 10);
}

function getTvYield(html: string) {
  const $ = cheerio.load(html);
  const yields = ($(".tv-table tr")
    .last()
    .find("td")
    .map(
      (_, el) =>
        parseInt(
          $(el)
            .text()
            .trim(),
          10
        ) || 0
    )
    .toArray() as unknown) as number[];
  return {
    hp: yields[0],
    sta: yields[1],
    spd: yields[2],
    atk: yields[3],
    def: yields[4],
    spatk: yields[5],
    spdef: yields[6]
  };
}

function getGenderRatio(html: string) {
  const $ = cheerio.load(html);
  const catchRate = $(".infobox-row-name")
    .filter((_i, el) => {
      return (
        $(el)
          .text()
          .trim()
          .toLowerCase() === "gender ratio"
      );
    })
    .parent()
    .find(".infobox-row-value")
    .last()
    .text()
    .trim();
  const maleRatio = catchRate.match(/(\d+)% male/);
  const femaleRatio = catchRate.match(/(\d+)% female/);
  return {
    male:
      maleRatio && maleRatio.length === 2 && !isNaN(parseInt(maleRatio[1], 10))
        ? parseInt(maleRatio[1], 10)
        : 50,
    female:
      femaleRatio &&
      femaleRatio.length === 2 &&
      !isNaN(parseInt(femaleRatio[1], 10))
        ? parseInt(femaleRatio[1], 10)
        : 50
  };
}

function getTraits(html: string) {
  const $ = cheerio.load(html);
  const $traitInfo = $(".infobox-row")
    .filter((_i, el) => {
      return !!$(el)
        .text()
        .includes("Traits");
    })
    .first()
    .find(".infobox-row-value")
    .last();
  return typedToArray<string>(
    $traitInfo.find("a").map((_i, el) =>
      $(el)
        .text()
        .trim()
    )
  );
}

function getDetails(html: string) {
  const $ = cheerio.load(html);
  const heightInfo = $(".infobox-half-row")
    .filter((_i, el) => {
      return !!$(el)
        .text()
        .includes("Height");
    })
    .first()
    .find(".infobox-row-value")
    .last()
    .text();
  const weightInfo = $(".infobox-half-row")
    .filter((_i, el) => {
      return !!$(el)
        .text()
        .includes("Weight");
    })
    .first()
    .find(".infobox-row-value")
    .last()
    .text();
  return {
    height: {
      cm: cleanToNumber(getDetailSafely(heightInfo, "cm", 0)),
      inches: cleanToNumber(getDetailSafely(heightInfo, '"', 1))
    },
    weight: {
      kg: cleanToNumber(getDetailSafely(weightInfo, "kg", 0)),
      lbs: cleanToNumber(getDetailSafely(weightInfo, "lbs", 1))
    }
  };
}

function getDetailSafely(str: string, key: string, i: number) {
  if (!str.includes(key)) return 0;
  try {
    return parseInt(str.split("/")[i], 10);
  } catch {
    return 0;
  }
}

function getTechniques(html: string) {
  const $ = cheerio.load(html);
  const techniques: any[] = [];
  $("#mw-content-text table").each((_i, el) => {
    const type = getTechniqueTableType(
      $(el)
        .find("caption")
        .first()
        .text()
        .trim()
    );
    if (!type) return undefined;
    const typeTechniques = getTechniquesFromTable($, el, type);
    techniques.push(...typeTechniques);
  });
  return techniques;
}

function getTechniqueTableType(caption: string) {
  if (!caption.startsWith("List of Techniques")) return undefined;
  if (caption.includes("Leveling")) {
    return TechniqueSource.LEVELLING;
  } else if (caption.includes("Courses")) {
    return TechniqueSource.TRAINING_COURSE;
  } else if (caption.includes("Breeding")) {
    return TechniqueSource.BREEDING;
  } else {
    return undefined;
  }
}

function getGameDescription(html: string) {
  const $ = cheerio.load(html);
  let potentialEl = $("#Description")
    .parent()
    .next();
  if (potentialEl[0].name !== "table") {
    potentialEl = $(potentialEl).next();
  }
  if (potentialEl[0].name !== "table") {
    return "";
  }
  const text = $(potentialEl)
    .find("i")
    .text()
    .trim();
  return text || "";
}

function getTechniquesFromTable(
  $: CheerioStatic,
  table: CheerioElement,
  type: ReturnType<typeof getTechniqueTableType>
) {
  return $(table)
    .find("tbody>tr")
    .map((i, el) => {
      if (i === 0) return undefined;
      const tdIndex = type === "Breeding" ? 0 : 1;
      const techniqueName = $(el)
        .find("td")
        .eq(tdIndex)
        .text()
        .trim();
      const data =
        !techniqueName || techniqueName === "?"
          ? undefined
          : { name: techniqueName, source: type };
      if (data && type === "Levelling") {
        const levels = parseInt(
          $(el)
            .find("td")
            .eq(0)
            .text()
            .trim(),
          10
        );
        (data as any).levels = isNaN(levels) ? 0 : levels;
      }
      return data;
    })
    .toArray()
    .filter(Boolean);
}

function getTrivia(html: string) {
  const $ = cheerio.load(html);
  const trivia = typedToArray<string>(
    $("#Trivia")
      .parent()
      .next()
      .find("li")
      .map((_i, el) =>
        $(el)
          .text()
          .replace(/\[.\]/g, "")
          .replace(/\\/g, "")
          .trim()
      )
  );
  return trivia;
}

function getEvolutionInfo(items: any[], item: any, html: string) {
  const $ = cheerio.load(html);
  const $evolutionHeader = $("#Evolution");
  if ($evolutionHeader.length) {
    let $evolutionTable = $evolutionHeader.parent().next();
    if (!$evolutionTable.is("table")) {
      $evolutionTable = $evolutionTable.next();
      if (!$evolutionTable.is("table")) {
        $evolutionTable = $evolutionTable.next();
        if (!$evolutionTable.is("table")) {
          if (item.name === "Tuwai" || item.name === "Tuvine") {
            return {
              stage: item.name === "Tuwai" ? 1 : 2,
              evolutionTree: [],
              evolves: true,
              type: "special",
              description:
                "Tuwai can evolve into Tuvine by taking one to the Crystal Shrine, and selecting it. This requires that you beat the Cultist Hunt side-quest."
            } as any;
          }
          log.warn("Gave up on evolution table for", item.name);
          return {};
        }
      }
    }
    const evolutionParts: (string | number)[] = [];
    $evolutionTable.find("tbody>tr>td").each((i, el) => {
      const text = $(el)
        .text()
        .trim();
      if (
        text.includes("Levels") ||
        ($(el).children("a").length &&
          text !== "" &&
          text !== "100x100px" &&
          text !== "???")
      ) {
        evolutionParts.push(
          isNaN(parseInt(text, 10)) ? text : parseInt(text, 10)
        );
      }
    });
    const evolutionTree = evolutionParts.reduce<any>((prev, cur) => {
      if (typeof cur === "string" && !cur.includes("Levels")) {
        const evoItem = items.find(({ name }) => name === cur);
        prev.push({
          number: evoItem ? evoItem.number : -1,
          name: cur,
          stage: Number(prev.length) + 1
        });
      } else if (prev.length) {
        const cleaned = `${cur}`
          .replace(/./g, i => (!isNaN(Number(i)) ? i : ""))
          .trim();
        prev[prev.length - 1].levels = `${cur}`.includes("?")
          ? 0
          : parseInt(cleaned, 10);
        prev[prev.length - 1].trading = `${cur}`.includes("Trading");
      }
      return prev;
    }, []);
    if (evolutionTree.length === 1) {
      return {
        evolves: false
      };
    }
    return {
      stage:
        Number(evolutionTree.findIndex(({ name }) => item.name === name)) + 1,
      evolutionTree,
      evolves: true,
      type: "level"
    };
  } else {
    return {
      evolves: false
    };
  }
}
