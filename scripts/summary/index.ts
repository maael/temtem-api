import path from "path";
import { promises as fs } from "fs";
import * as log from "../util/log";
import write from "../util/write";

(async () => {
  log.info("Building summary");
  const dataRoot = path.join(__dirname, "..", "..", "data");
  const dataFiles = (await fs.readdir(dataRoot)).filter(
    n => ![".gitkeep", "summary.json"].includes(n)
  );
  const dataStats = await Promise.all(
    dataFiles.map(async d => ({
      mtime: (await fs.stat(path.join(dataRoot, d))).mtime,
      name: d
    }))
  );
  const toWrite = {
    mostRecent: dataStats
      .map(({ mtime }) => mtime)
      .sort()
      .pop(),
    dataStats
  };
  log.info("mostRecent", toWrite.mostRecent);
  await write("summary", toWrite);
})().catch(e => {
  log.error(e);
  throw e;
});
