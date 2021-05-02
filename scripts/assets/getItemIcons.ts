import path from "path";
import throat from "throat";
import pipeFile from "../util/pipeFile";
import * as log from "../util/log";

const items = require("../../data/items.json");

const CONCURRENCY_LIMIT = 10;

export default async function getItemIcons() {
  log.info("Starting");
  await Promise.all(
    items.map(
      throat(CONCURRENCY_LIMIT, async (item) => {
        try {
          const { base } = path.parse(item.largeWikiImageUrl);
          const cleanFilename = base.split("-").pop()!;
          await pipeFile((item.largeWikiImageUrl as unknown) as string, [
            "images",
            "icons",
            "items",
            cleanFilename,
          ]);
        } catch (e) {
          log.error(e.message);
        }
      })
    )
  );
  log.info("Finished");
}
