import throat from "throat";
import pipeFile from "../util/pipeFile";
import * as log from "../util/log";

const knownTems = require("../../data/knownTemtemSpecies.json");

const CONCURRENCY_LIMIT = 10;

export default async function getTemPortraits() {
  log.info("Starting");
  await Promise.all(
    knownTems.map(
      throat(CONCURRENCY_LIMIT, async item => {
        try {
          await pipeFile((item.portraitWikiUrl as unknown) as string, [
            "images",
            "portraits",
            "temtem",
            "small",
            `${item.name}.png`
          ]);
        } catch (e) {
          log.error(e.message);
        }
      })
    )
  );
  log.info("Finished");
}
