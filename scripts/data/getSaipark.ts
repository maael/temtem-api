import got from "got";
import cheerio from "cheerio";
import { typedToArray } from "../util/cheerioHelpers";

let existing = [];
try {
  existing = require("../../data/saipark.json");
} catch {
  // Do nothing
}

export default async function getSaipark() {
  const result = await got("https://temtem.gamepedia.com/Saipark");
  const $ = cheerio.load(result.body);
  const page = $("#mw-content-text");
  const header = page.find("#Available_Temtem");
  const $dateRange = header.parent().next();
  const $land = $dateRange.next();
  const landInfo = getInfo($, $land);
  const $water = $dateRange.next().next();
  const waterInfo = getInfo($, $water);
  const dateRange = $dateRange.text().trim();
  const dateInfo = processDate(dateRange);
  return [
    {
      dateRange,
      startDate: formatDate(dateInfo.start),
      endDate: formatDate(dateInfo.end),
      land: [landInfo],
      water: [waterInfo]
    }
  ].concat(
    existing.filter(
      ({ dateRange: existingDateRange }) => existingDateRange !== dateRange
    )
  );
}

function formatDate({
  day,
  month,
  year
}: {
  day: number;
  month: number;
  year: number;
}) {
  return new Date(
    `${year}-${`${month}`.padStart(2, "0")}-${`${day}`.padStart(2, "0")}`
  ).toISOString();
}

const monthAbbrevs = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

function processDate(text: string) {
  const year = text.match(/(\d{4})/);
  const firstMonth = monthAbbrevs.findIndex(a => text.includes(a)) + 1;
  const secondMonth =
    monthAbbrevs.findIndex(a =>
      text.slice(text.indexOf(monthAbbrevs[firstMonth - 1])).includes(a)
    ) + 1;
  const days = text.match(/(\d{2})/g);
  return {
    start: {
      day: days ? Number(days[0]) : 0,
      month: firstMonth,
      year: year ? Number(year[0]) : 0
    },
    end: {
      day: days ? Number(days[1]) : 0,
      month: secondMonth,
      year: year ? Number(year[0]) : 0
    }
  };
}

function getInfo($: CheerioStatic, $el: Cheerio) {
  const temtem = $el
    .find(".temtemPortrait")
    .parent()
    .text()
    .trim();
  const $data = $el
    .find(".temtemPortrait")
    .parent()
    .next();
  const info = typedToArray<string>(
    $data.find("tr > td").map((_i, el) =>
      $(el)
        .text()
        .trim()
        .split("")
        .map(i => i.trim())
        .filter(i => i && (!isNaN(Number(i)) || i === "."))
        .join("")
    )
  ).filter(i => i !== ".");
  return {
    temtem,
    lumaRate: parseFloat(info[0]) || 0,
    minSvs: parseFloat(info[1]) || 0,
    eggMoves: parseFloat(info[2]) || 0
  };
}
