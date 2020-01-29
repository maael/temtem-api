import path from "path";
import * as log from "../util/log";
import getGit, { getStagedDataFiles } from "../util/git";
import write from "../util/write";

let existing = {
  mostRecent: "",
  dataStats: [] as any[]
};
try {
  existing = require("../../data/summary.json");
} catch {
  // Do nothing
}

(async () => {
  log.info("Building summary");
  const git = getGit();
  const status = await getStagedDataFiles(git, ["summary.json"]);
  const getFilenames = status.map(f => path.parse(f).name);
  const updateTime = new Date().toISOString();
  const updateMap = getFilenames.map(name => ({
    mtime: updateTime,
    name
  }));
  const mergedDataStats = [
    ...existing.dataStats.filter(({ name }) => !getFilenames.includes(name)),
    ...updateMap
  ];
  const newMostRecent = mergedDataStats
    .map(({ mtime }) => mtime)
    .sort()
    .pop();
  if (newMostRecent === existing.mostRecent) {
    log.info("Skipping as mostRecent has not changed", existing.mostRecent);
  } else {
    const toWrite = {
      ...existing,
      mostRecent: newMostRecent,
      dataStats: mergedDataStats.sort((a, b) => b.name.localeCompare(a.name))
    };
    log.info("mostRecent", toWrite.mostRecent);
    await write("summary", toWrite);
  }
})().catch(e => {
  log.error(e);
  throw e;
});
