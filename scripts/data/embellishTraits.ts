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
  return toText($(".infobox-table tr .infobox-centered i").html());
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

  return toText(element.parent().next().html());
}

function toText(html: string | null) {
  if (html) {
    while (html.search("<a") >= 0) {
      const posStart = html.search("<a");
      const posEnd = html.search("</a>") + 4;
      let link = html.substring(posStart, posEnd);
      if (link.search("<img") >= 0) {
        let title = link.substring(
          link.search('title="') + 7,
          link.search('">')
        );
        if (title.search("\\+") >= 0 || title.search("\\-") >= 0) {
          html = html.replace(link, " " + title);
        } else {
          html = html.replace(link, "");
        }
      } else {
        let content = link.substring(
          link.search('">') + 2,
          link.search("</a>")
        );
        html = html.replace(link, content);
      }
    }
    html = html.replace("&lt;", "<");
    html = html.replace("&gt;", ">");
    return html.trim().replace(/\\n/g, "");
  }
  return "";
}
