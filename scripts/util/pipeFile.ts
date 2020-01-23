import stream from "stream";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import got from "got";

const pipeline = promisify(stream.pipeline);

export default async function pipeFile(fileUrl: string, p: string[]) {
  return pipeline(
    got.stream(fileUrl),
    fs.createWriteStream(path.join(__dirname, "..", "..", "public", ...p))
  );
}
