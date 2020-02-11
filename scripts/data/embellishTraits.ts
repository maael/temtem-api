import cheerio from "cheerio";
import * as log from "../util/log";
import fetchHTML from "../util/fetchHTML";
import { Trait as MinimalTrait } from "./getTraits";

export interface Trait extends MinimalTrait {
  description: string;
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
          description: $("#In-Game_Description")
            .parent()
            .next()
            .text()
            .trim()
            .replace(/\\n/g, "")
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    return result;
  } catch (e) {
    log.error(e.message);
  }
}
