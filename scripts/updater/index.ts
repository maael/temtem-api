import path from "path";
import simpleGit from "simple-git/promise";
import * as log from "../util/log";

(async () => {
  const git = simpleGit(path.join(__dirname, "..", "..", "data"));
  const status = await git.status();
  const dataFiles = status.files
    .map(({ path: p }) => p)
    .filter(p => p.startsWith("data"))
    .map(p => path.resolve(path.join(__dirname, "..", "..", p)))
    .filter(testChanged);
  if (dataFiles.length) {
    log.info("Staging data files", dataFiles);
    await git.add(dataFiles);
    log.info("Commiting");
    await git.commit("data: 🤖 Automatically updating data files", dataFiles);
    await git.push();
  } else {
    log.info("No safe data changes found, skipping");
  }
})().catch(log.error);

function testChanged(p: string) {
  try {
    const data = require(p);
    if (typeof data !== "object") throw new Error("Unexpected type");
    log.info("Checked and adding", p);
    return true;
  } catch (e) {
    log.warn("Checked and failed", p, `(${e.message})`);
    return false;
  }
}
