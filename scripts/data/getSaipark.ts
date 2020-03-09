import got from "got";
import cheerio from "cheerio";
import { typedToArray } from "../util/cheerioHelpers";
import { formatDate, processDate } from "../util/date";

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
