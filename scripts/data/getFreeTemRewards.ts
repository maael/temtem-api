import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";
import { formatDate, processDate } from "../util/date";
import { stripQuerystring } from "../util/url";
import { FreetemReward } from "../checker/codecs/freetemRewards";

export default async function getFreetemRewards() {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got(
      "https://temtem.gamepedia.com/FreeTem!_Organisation"
    );
    const $ = cheerio.load(result.body);
    const tableRows = $("#Rewards").parent().next().find("tr");
    return typedToArray<FreetemReward>(
      tableRows.map((i, el) => {
        if (i === 0) return;
        const parts = typedToArray<{
          text: string;
          link: string;
          href: string;
          src: string;
        }>(
          $(el)
            .find("td")
            .map((_j, td) => ({
              text: $(td).text().trim(),
              link: $(td).find("a").text().trim(),
              href: $(td).find("a").attr("href"),
              src: $(td).find("img").attr("src"),
            }))
        );
        const quantity = parseInt(
          `${(parts[1].text.match(/(\d+)x/) || [])[1] || 1}`,
          10
        );
        const freedTemtem = parseInt(
          `${(parts[3].text.match(/(\d+)/) || [])[1] || 1}`,
          10
        );
        const dateInfo = parts[4].text
          ? processDate(parts[4].text)
          : parts[4].text;
        const reward: FreetemReward = {
          name: parts[1].link,
          quantity,
          wikiUrl: `https://temtem.gamepedia.com${parts[1].href}`,
          wikiImageUrl: stripQuerystring(parts[0].src),
          effectDescription: parts[2].text,
          requirement: parts[3].text,
          freedTemtem,
          duration: parts[4].text,
          startDate:
            typeof dateInfo === "string"
              ? dateInfo
              : formatDate(dateInfo.start),
          endDate:
            typeof dateInfo === "string" ? dateInfo : formatDate(dateInfo.end),
        };
        return reward;
      })
    ).reverse();
  } catch (e) {
    log.error(e.message);
  }
}
