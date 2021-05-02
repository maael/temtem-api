import * as log from "./log";

export function formatDate({
  day,
  month,
  year,
}: {
  day: number;
  month: number;
  year: number;
}) {
  const dateStr = `${year}-${`${month}`.padStart(2, "0")}-${`${day}`.padStart(
    2,
    "0"
  )}`;
  try {
    return new Date(dateStr).toISOString();
  } catch (e) {
    log.warn(`Failed to format date from: ${dateStr}`);
    return "";
  }
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
  "Dec",
];

export function processDate(text: string) {
  const year = text.match(/(\d{4})/);
  const matchedMonths = monthAbbrevs
    .map((a, i) => (text.includes(a) ? i + 1 : 0))
    .filter(Boolean);
  const days = text.match(/(\d{1,2})/g);
  return {
    start: {
      day: days ? Number(days[0]) : 0,
      month: matchedMonths[0],
      year: year ? Number(year[0]) : 2020,
    },
    end: {
      day: days ? Number(days[1]) : 0,
      month: matchedMonths[1] || matchedMonths[0],
      year: year ? Number(year[0]) : 2020,
    },
  };
}
