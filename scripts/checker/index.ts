import { promises as fs } from "fs";
import { PathReporter } from "io-ts/lib/PathReporter";
import codecMap from "./codecs";
import * as log from "../util/log";

(async () => {
  const dataDir = __dirname + "/../../data/";
  const dataFiles = (await fs.readdir(dataDir)).filter(
    (i) => i.endsWith(".json") && !i.startsWith("summary")
  );
  dataFiles.forEach((i) => {
    const name = i.split(".").slice(0, -1).join("");
    const codec = codecMap[name];
    if (codec) {
      let data;
      try {
        data = require(`${dataDir}/${i}`);
      } catch (e) {
        log.warn("Could not read data file:", `${dataDir}/${i}`);
      }
      const result = codec.decode(data);
      log.info(PathReporter.report(result));
    } else {
      log.warn("Missing codec for:", name);
    }
  });
})().catch((e) => {
  log.error(e);
  process.exit(0);
});
