import cheerio from "cheerio";
import * as log from "../util/log";
import fetchHTML from "../util/fetchHTML";
import { Trait as MinimalTrait } from "./getTraits";

export interface Trait extends MinimalTrait {
  description: string;
  effect: string;
}

export default async function getTraits(
  traits: MinimalTrait[]
): Promise<Trait[] | undefined> {
  log.info("Starting");
  try {
    log.info("Running");
    const webpages = await fetchHTML("traits", traits, "wikiUrl");
    const result = webpages
      .map(({ item, html }) => {
        const $ = cheerio.load(html);
        return {
          ...item,
          description: getDescription($),
          effect: getEffect($),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    return result;
  } catch (e) {
    log.error(e.message);
  }
}

function getDescription($: cheerio.Root) {
  return $(".infobox-table").first().find("i").first().text();
}

function getEffect($: cheerio.Root) {
  return getText($, "#Effect_Description", "#Effect").replace(
    "In-depth analysis here.",
    ""
  );
}

function getText(
  $: cheerio.Root,
  primarySelector: string,
  secondarySelector: string
) {
  const element = $(primarySelector).length
    ? $(primarySelector)
    : $(secondarySelector);
  return element.parent().next().text().trim().replace(/\\n/g, "");
}
