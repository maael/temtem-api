import throat from "throat";
import pipeFile from "../util/pipeFile";
import * as log from "../util/log";

const knownTems = require("../../data/knownTemtemSpecies.json");

const CONCURRENCY_LIMIT = 5;

export default async function getTemPortraits() {
  log.info("Starting");
  await Promise.all(
    knownTems.map(
      throat(CONCURRENCY_LIMIT, async item => {
        try {
          await Promise.all([
            pipeFile(item.wikiPortraitUrlLarge, [
              "images",
              "portraits",
              "temtem",
              "large",
              `${item.name}.png`
            ]),
            item.lumaWikiPortraitUrlLarge
              ? pipeFile(item.lumaWikiPortraitUrlLarge, [
                  "images",
                  "portraits",
                  "temtem",
                  "luma",
                  "large",
                  `${item.name}.png`
                ])
              : undefined
          ]);
        } catch (e) {
          log.error(e.message);
        }
      })
    )
  );
  log.info("Finished");
}
