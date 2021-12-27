import * as log from "./log";
import parse from "date-fns/parse";
import endOfWeek from "date-fns/endOfWeek";
import differenceInDays from "date-fns/differenceInDays";
import addDays from "date-fns/addDays";
import format from "date-fns/format";

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

export function processYearWeekDate(text: string) {
  const start = addDays(
    parse(text.replace("Week", "").replace("  ", " "), "YYYY ww", new Date(), {
      useAdditionalWeekYearTokens: true,
    }),
    1
  );
  const end = addDays(endOfWeek(start), 1);
  return {
    start: start.toISOString(),
    end: end.toISOString(),
    durationLength: Math.abs(differenceInDays(start, end)),
    duration: `${format(start, "MMMM dd")} - ${format(end, "MMMM dd")}`,
  };
}
