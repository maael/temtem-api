import got from "got";
import throat from "throat";
import * as log from "../util/log";

const CONCURRENCY_LIMIT = 10;

export default async function htmlFetcher<T = any>(
  label: string,
  items: T[],
  itemKey: string,
  prefix: boolean = false
): Promise<{ item: T; html: string }[]> {
  log.info(`Fetching ${label} html for ${items.length} items`);
  const result = await Promise.all(
    items.map(
      throat(CONCURRENCY_LIMIT, async item => {
        const url = prefix
          ? `https://temtem.gamepedia.com/${item[itemKey]}`
          : item[itemKey];
        const res = await got(url);
        return {
          item,
          html: res.body
        };
      })
    )
  );
  log.info(`Fetched ${label} html for ${items.length} items`);
  return result;
}
