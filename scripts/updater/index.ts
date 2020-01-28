import path from "path";
import getGit, { getStagedDataFiles } from "../util/git";
import * as log from "../util/log";

(async () => {
  const git = getGit();
  const dataFiles = await getStagedDataFiles(git);
  if (dataFiles.length) {
    log.info("Staging data files", dataFiles);
    await git.add(dataFiles);
    log.info("Commiting");
    await git.commit("data: 🤖 Automatically updating data files", dataFiles);
    await git.push();
  } else {
    log.info("No safe data changes found, skipping");
  }
})().catch(e => {
  log.error(e);
  throw e;
});
