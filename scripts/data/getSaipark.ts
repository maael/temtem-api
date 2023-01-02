import got from "got";
import cheerio from "cheerio";
import sub from "date-fns/sub";
import format from "date-fns/format";
import parse from "date-fns/parse";
import isMatch from "date-fns/isMatch";
import endOfWeek from "date-fns/endOfWeek";
import { typedToArray } from "../util/cheerioHelpers";

interface Item {
  temtem: string;
  area: string;
  areas: string[];
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
    areas: item.areas,
    ratePercent: item.ratePercent,
    lumaRate: item.lumaRate,
    minSvs: item.minSvs,
    eggTechPercent: item.eggTechPercent,
  };
}

function parseDate(dateString: string, referenceDate: Date) {
  const possibleFormats = [
    "d",
    "d MMM",
    "d MMMM",
    "d MMM y",
    "d MMMM y",
    "MMM d",
    "MMMM d",
    "MMM d y",
    "MMMM d y",
  ];

  // Special Case: Sometimes the month is written with 4 letters instead of 3 (e.g. "Sept" instead of "Sep")
  // In that case just try to remove the last letter
  const parts = dateString.split(" ");
  if (parts.length >= 1 && parts[0].length === 4) {
    parts[0] = parts[0].substring(0, 3);
  } else if (parts.length >= 2 && parts[1].length == 4) {
    parts[1] = parts[1].substring(0, 3);
  }
  const updatedDateString = parts.join(" ");

  for (let i = 0; i < possibleFormats.length; i++) {
    if (isMatch(updatedDateString, possibleFormats[i])) {
      return parse(updatedDateString, possibleFormats[i], referenceDate);
    }
  }
  return referenceDate;
}

/*
 * Existing possibilities of values for parameter "week":
 *   "2020 Week 50"
 *   "8-14 March 2021"
 *   "23 - 29 Aug 2021"
 *   "Mar 29 - Apr 4 2021"
 *   "31 May - 6 June 2021"
 *   "27 Dec 2021 - 2 Jan 2022"
 *   "30 Aug - 5 Sept 2021"
 *   "26 Dec - 1 Jan 2023"
 */
function parseAvailability(week: string) {
  const weekLowercase = week.toLowerCase();
  if (weekLowercase.includes("week")) {
    const weekParts = weekLowercase
      .split("week")
      .map((i) => parseInt(i.trim(), 10));
    const year = weekParts[0];
    const weeks = weekParts[1];
    const startOfYear = new Date(year, 0);
    const startDate = parse(weeks.toString(), "I", startOfYear);
    const endDate = endOfWeek(startDate, { weekStartsOn: 1 });
    return {
      startDate,
      endDate,
    };
  } else {
    const parts = weekLowercase.split("-").map((i) => i.trim());
    const endStr = parts[1];
    const startStr = parts[0];
    const endDate = parseDate(endStr, new Date());
    let startDate = parseDate(startStr, endDate);
    if (startDate > endDate) {
      // Probably no year specified on start date (e.g. "26 Dec - 1 Jan 2023")
      startDate = sub(startDate, { years: 1 });
    }
    return {
      startDate,
      endDate,
    };
  }
}

export default async function getSaipark() {
  const result = await got("https://temtem.wiki.gg/wiki/Saipark");
  const $ = cheerio.load(result.body);
  const $previousTable = $("#Featured_Temtem_history").parent().next().next();
  const rows = typedToArray<Item>(
    $($previousTable)
      .find("tbody > tr")
      .map((_i, tr) => {
        const data = typedToArray<{ text: string; href: string }>(
          $(tr)
            .find("td")
            .map((_j, td) => ({
              text: $(td).text().replace(/\\n/, "").trim(),
              href: $(td).find("a").attr("href") || "",
            }))
        );
        if (data.length === 0) return undefined;
        return {
          temtem: data[0].text,
          area: data[1].text,
          areas: data[1].text.split(",").map((a) => a.trim()),
          week: data[6].text,
          tweet: data[6].href,
          ratePercent: parseFloat(data[2].text.replace("%", "")) || 100,
          lumaRate: parseFloat(data[3].text.replace("x", "")) || 0,
          minSvs: parseFloat(data[4].text) || 0,
          eggTechPercent: parseFloat(data[5].text.replace("%", "")) || 0,
        };
      })
  );
  const byWeek: Record<string, typeof rows> = rows.reduce((acc, i) => {
    return { ...acc, [i.week]: (acc[i.week] || []).concat(i) };
  }, {});
  const formatted = Object.entries(byWeek).reduce<any>((acc, [_, items]) => {
    const { startDate, endDate } = parseAvailability(items[0].week);
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
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      tweet: items[0].tweet,
      land: items
        .filter((i) =>
          ["Hills", "Fields", "Caves"].some((l) => i.areas.includes(l))
        )
        .map(formatItem),
      water: items.filter((i) => i.areas.includes("Water")).map(formatItem),
    });
  }, []);
  return formatted;
}
