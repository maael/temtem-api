import stream from "stream";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import got from "got";

const pipeline = promisify(stream.pipeline);

export const baseDir = path.join(__dirname, "..", "..", "public");

const dirCache = {};

export default async function pipeFile(fileUrl: string, p: string[]) {
  const args = process.argv.slice(2);
  const isUpdate = args.includes("-u");
  if (!isUpdate) {
    const fileName = p.slice(-1)[0];
    const base = p.slice(0, -1);
    const baseFolder = path.join(baseDir, ...base);
    if (!dirCache[baseFolder]) {
      dirCache[baseFolder] = fs.promises.readdir(baseFolder, "utf-8");
    }
    if (
      (await dirCache[baseFolder]).some(
        f => f.toLowerCase() === fileName.toLowerCase()
      )
    ) {
      return Promise.resolve();
    }
  }
  return pipeline(
    got.stream(fileUrl),
    fs.createWriteStream(path.join(baseDir, ...p))
  );
}
