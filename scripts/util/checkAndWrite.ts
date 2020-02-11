import { promises as fs } from "fs";
import path from "path";
import { PathReporter } from "io-ts/lib/PathReporter";
import codecMap, { Codec } from "../checker/codecs";
import * as log from "./log";
import write from "./write";

export default async function checkAndWrite(
  codecKey: Codec | "missing",
  file: string,
  data: any
) {
  const awaitedData = await (typeof data === "function" ? data() : data);
  const itemCount = Array.isArray(awaitedData) ? awaitedData.length : 1;
  log.info(
    `Checking ${itemCount} ${codecKey} item${itemCount === 1 ? "" : "s"}`
  );
  const codec = codecMap[codecKey];
  if (codec && codecKey !== "missing") {
    const result = codec.decode(awaitedData);
    const report = PathReporter.report(result);
    if (report.length !== 1 && report[0] !== "No errors!") {
      log.error(
        `Codec errors, writing error log, skipping write for "${codecKey}"`
      );
      await writeErrorLog(codecKey, file, awaitedData, report);
      return;
    } else {
      log.info(`Passed codec: ${codecKey}`);
    }
  } else {
    log.warn(`No codec found to enforce for: "${codecKey}"`);
  }
  try {
    await write(file, awaitedData);
  } catch (e) {
    log.error(`Problem writing data: "${e.message}"`);
  }
}

async function writeErrorLog(
  codecKey: Codec,
  file: string,
  data: any,
  report: string[]
) {
  try {
    const dateTime = new Date()
      .toISOString()
      .replace(/:/g, "-")
      .split(".")[0];
    const logName = `[error]-[${dateTime}]-[${codecKey}]-[${file}].log`;
    const logPath = path.join(__dirname, "..", "..", "codec-logs", logName);
    await fs.writeFile(
      logPath,
      `${JSON.stringify(data, undefined, 2)}\n\n${Array.from({ length: 10 })
        .map(() => "-")
        .join("")}\n\n${report.join("\n")}`
    );
  } catch (e) {
    log.error(`Problem writing error log: "${e.message}"`);
  }
}
