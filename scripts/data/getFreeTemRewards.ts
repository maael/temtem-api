import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import { typedToArray } from "../util/cheerioHelpers";
import { processYearWeekDate } from "../util/date";
import { FreetemReward } from "../checker/codecs/freetemRewards";
import parse from "date-fns/parse";
import format from "date-fns/format";

export default async function getFreetemRewards(gear: any) {
  log.info("Starting");
  try {
    log.info("Running");
    const result = await got(
      "https://temtem.gamepedia.com/FreeTem!_Organisation"
    );
    const $ = cheerio.load(result.body);
    const tableRows = $("#Reward_History").parent().next("table").find("tr");
    const past = typedToArray<FreetemReward>(
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
        const freedTemtem = parseInt(parts[2].text, 10);
        const dateInfo = processYearWeekDate(parts[3].text);
        const name = parts[0].text;
        const wikiUrl = `https://temtem.gamepedia.com${parts[0].href}`;
        const matchedGear = gear.find(
          (g) => g.name === name || g.wikiUrl === wikiUrl
        );
        const reward: FreetemReward = {
          name,
          quantity: parseInt(parts[1].text, 10),
          wikiUrl,
          wikiImageUrl: matchedGear ? matchedGear.wikiIconUrl : "",
          effectDescription: matchedGear ? matchedGear.description : "",
          requirement: `${freedTemtem} releases`,
          freedTemtem,
          duration: dateInfo.duration,
          startDate: dateInfo.start,
          endDate: dateInfo.end,
        };
        return reward;
      })
    ).reverse();
    const [start, end] = $("#rewards-curr-table")
      .prev("h3")
      .find(".mw-headline")
      .text()
      .split(" to ")
      .map((i) => {
        const clean = i.trim();
        let part = "";
        try {
          const parse1 = parse(clean, "MMMM do, yyyy", new Date());
          part = format(parse1, "yyyy-MM-dd");
        } catch {
          try {
            const parse2 = parse(clean, "MMMM do", new Date());
            part = format(parse2, "yyyy-MM-dd");
          } catch (e) {
            log.warn(clean, e);
          }
        }
        return part;
      });
    const current = $("#rewards-curr-table").find("tr").last();
    const currentItems = typedToArray<{
      text: string;
      link: string;
      href: string;
      p: string;
    }>(
      $(current)
        .find("td")
        .map((_j, td) => ({
          text: $(td).text().trim(),
          link: $(td).find("a").text().trim(),
          href: $(td).find("a").attr("href"),
          p: $(td).find("p").text().trim(),
        }))
    ).map((i) => {
      const name = i.link;
      const wikiUrl = `https://temtem.gamepedia.com${i.href}`;
      const matchedGear = gear.find(
        (g) => g.name === name || g.wikiUrl === wikiUrl
      );
      const reward: FreetemReward = {
        name,
        quantity: parseInt(
          i.text
            .replace(i.link, "")
            .replace(i.p, "")
            .trim()
            .replace("\n", "")
            .replace("x", "")
            .trim(),
          10
        ),
        wikiUrl,
        wikiImageUrl: matchedGear ? matchedGear.wikiIconUrl : "",
        effectDescription: matchedGear ? matchedGear.description : "",
        requirement: i.p,
        freedTemtem: parseInt(i.p.replace("releases", ""), 10),
        duration: `${format(
          parse(start, "yyyy-MM-dd", new Date()),
          "MMMM dd"
        )} - ${format(parse(end, "yyyy-MM-dd", new Date()), "MMMM dd")}`,
        startDate: start,
        endDate: end,
      };
      return reward;
    });
    return past.concat(currentItems);
  } catch (e) {
    log.error(e.message);
    return [];
  }
}
