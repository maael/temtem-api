import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";
import fetchHTML from "../util/fetchHTML";

export default async function embellishPatches(patches: any) {
  log.todo(`Embellishing ${patches.length} patches`);
  const webpages = await fetchHTML("patches", patches, "url");
  const result = webpages.map(embellishPatch);
  await write("patches", result);
  process.exit(0);
}

function embellishPatch({ item, html }) {
  const $ = cheerio.load(html);
  const $imgs = $(".entry-content p img");
  const patchInfo = ($imgs
    .map((_i, el) => {
      const src = $(el).attr("data-src") || "";
      const type = src.includes("Improvements")
        ? "improvements"
        : src.includes("Fixes")
        ? "fixes"
        : src.includes("NewStuff")
        ? "features"
        : src.includes("Balance")
        ? "balance"
        : undefined;
      if (!type) {
        console.info("Missing patch type", src);
        return undefined;
      }
      const items = $(el)
        .parent()
        .next("ul")
        .find("li")
        .map((_j, patchItem) => {
          return $(patchItem)
            .text()
            .trim();
        })
        .toArray();
      return {
        type,
        items
      };
    })
    .toArray() as any)
    .filter(Boolean)
    .reduce((acc, i) => ({ ...acc, [i.type]: i.items }), {
      fixes: [],
      improvements: [],
      features: [],
      balance: []
    });
  return { ...item, patchInfo };
}
