import { promises as fs } from "fs";
import path from "path";
import * as log from "./log";
import traverse, {
  cleanStrings,
  capitalizeType,
  removeWikiReferences,
} from "./objectCleaner";

export function getDataPath(name: string) {
  return path.join(__dirname, "..", "..", "data", `${name}.json`);
}

export default async function write(name: string, data: any) {
  log.info("cleaning");
  const cleanData = traverse(data, [
    cleanStrings,
    capitalizeType,
    removeWikiReferences,
  ]);
  log.info("cleaned");
  log.info("writing", name);
  try {
    await fs.writeFile(
      getDataPath(name),
      JSON.stringify(cleanData, undefined, 2)
    );
    log.info("finished writing", name);
  } catch (e) {
    log.error("error writing", name, e.message);
  }
}
