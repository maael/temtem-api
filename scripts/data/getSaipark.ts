import got from "got";
import cheerio from "cheerio";
import sub from "date-fns/sub";
import add from "date-fns/add";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import { typedToArray } from "../util/cheerioHelpers";

const week_8_2020_start = "2020-02-17";
const week_1_2020_start = startOfWeek(
  sub(new Date(week_8_2020_start), { weeks: 8 })
);

interface Item {
  temtem: string;
  area: string;
  week: string;
  tweet: string;
  ratePercent: number;
  lumaRate: number;
  minSvs: number;
  eggTechPercent: number;
}

function formatItem(item: Item) {
  return {
    temtem: item.temtem,
    area: item.area,
    ratePercent: item.ratePercent,
    lumaRate: item.lumaRate,
    minSvs: item.minSvs,
    eggTechPercent: item.eggTechPercent
  };
}

export default async function getSaipark() {
  const result = await got("https://temtem.gamepedia.com/Saipark");
  const $ = cheerio.load(result.body);
  const $previousTable = $("#Featured_Temtem_History")
    .parent()
    .next()
    .next();
  const rows = typedToArray<Item>(
    $($previousTable)
      .find("tbody > tr")
      .map((_i, tr) => {
        const data = typedToArray<{ text: string; href: string }>(
          $(tr)
            .find("td")
            .map((_j, td) => ({
              text: $(td)
                .text()
                .replace(/\\n/, "")
                .trim(),
              href:
                $(td)
                  .find("a")
                  .attr("href") || ""
            }))
        );
        if (data.length === 0) return undefined;
        return {
          temtem: data[0].text,
          area: data[1].text,
          week: data[6].text,
          tweet: data[6].href,
          ratePercent: parseFloat(data[2].text.replace("%", "")) || 100,
          lumaRate: parseFloat(data[3].text.replace("x", "")) || 0,
          minSvs: parseFloat(data[4].text) || 0,
          eggTechPercent: parseFloat(data[5].text.replace("%", "")) || 0
        };
      })
  );
  const byWeek: Record<string, typeof rows> = rows.reduce((acc, i) => {
    return { ...acc, [i.week]: (acc[i.week] || []).concat(i) };
  }, {});
  const formatted = Object.entries(byWeek).reduce<any>((acc, [_, items]) => {
    const weekParts = items[0].week
      .toLowerCase()
      .split("week")
      .map(i => parseInt(i.trim()));
    const weeks = weekParts[1];
    const startDate = add(week_1_2020_start, { weeks, days: 1 });
    const endDate = add(endOfWeek(startDate), { days: 1 });
    const dateRangeStartFormat =
      startDate.getFullYear() === endDate.getFullYear()
        ? "MMM do"
        : "MMM do yyyy";
    return acc.concat({
      dateRange: `${format(startDate, dateRangeStartFormat)} to ${format(
        endDate,
        "MMM do yyyy"
      )}`,
      startDateFormatted: format(startDate, "dd/MM/yyyy"),
      endDateFormatted: format(endDate, "dd/MM/yyyy"),
      startDate: endDate.toISOString(),
      endDate: endDate.toISOString(),
      tweet: items[0].tweet,
      land: items
        .filter(i =>
          ["Hills", "Fields", "Caves"].some(l =>
            i.area
              .split(",")
              .map(a => a.trim())
              .includes(l)
          )
        )
        .map(formatItem),
      water: items
        .filter(i =>
          i.area
            .split(",")
            .map(a => a.trim())
            .includes("Water")
        )
        .map(formatItem)
    });
  }, []);
  return formatted;
}
