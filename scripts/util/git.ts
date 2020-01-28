import path from "path";
import simpleGit from "simple-git/promise";
import * as log from "./log";

export default function getGit() {
  return simpleGit(path.join(__dirname, "..", "..", "data"));
}

export async function getStagedDataFiles(
  git: simpleGit.SimpleGit,
  filter: string[] = []
) {
  const status = await git.status();
  const fileFilter = [...filter, ".gitkeep"];
  return status.files
    .map(({ path: p }) => p)
    .filter(p => p.startsWith("data") && !fileFilter.some(f => p.endsWith(f)))
    .map(p => path.resolve(path.join(__dirname, "..", "..", p)))
    .filter(testChanged);
}

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
