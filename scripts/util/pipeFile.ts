import stream from "stream";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import got from "got";
import sharp from "sharp";
import gifsicle from "gifsicle-stream";

const gifProcessor = new gifsicle(["-w", "-O3", "--resize-fit 600x600"]);

const pipeline = promisify(stream.pipeline);

export const baseDir = path.join(__dirname, "..", "..", "public");

const dirCache = {};

function getSharpProcessFromExt(fileName: string) {
  if ([".jpg", ".jpeg"].some(ext => fileName.endsWith(ext))) {
    return sharp()
      .resize({ width: 700, withoutEnlargement: true })
      .jpeg({ quality: 80 });
  } else if (fileName.endsWith(".gif")) {
    return gifProcessor;
  }
  return sharp()
    .resize({ width: 700, withoutEnlargement: true })
    .png({ quality: 80 });
}

export default async function pipeFile(fileUrl: string, p: string[]) {
  const args = process.argv.slice(2);
  const isUpdate = args.includes("-u");
  const fileName = p.slice(-1)[0];
  if (!isUpdate) {
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
    ...([
      got.stream(fileUrl),
      getSharpProcessFromExt(fileName),
      fs.createWriteStream(path.join(baseDir, ...p))
    ] as const)
  );
}
