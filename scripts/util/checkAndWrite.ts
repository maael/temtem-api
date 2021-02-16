import { promises as fs } from "fs";
import path from "path";
import got from "got";
import { PathReporter } from "io-ts/lib/PathReporter";
import codecMap, { Codec } from "../checker/codecs";
import * as log from "./log";
import write, { getDataPath } from "./write";

export default async function checkAndWrite(
  codecKey: Codec | "missing",
  file: string,
  data: any
) {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry") || args.includes("-D");
  const filter = args
    .filter(i => !i.startsWith("-"))
    .map(i => i.split(",").map(t => t.trim()))
    .reduce((acc, arr) => acc.concat(arr), []);
  const isDebug = args.includes("--debug");
  try {
    if (filter.length && !filter.includes(codecKey)) {
      log.info(`Skipping ${codecKey}, not in filter ${filter.join(", ")}`);
      try {
        return JSON.parse((await fs.readFile(getDataPath(file))).toString());
      } catch (e) {
        log.error(`Issue getting existing ${file} data`, e.message);
        return [];
      }
    }
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
      } else {
        log.info(`Passed codec: ${codecKey}`);
      }
    } else {
      log.warn(`No codec found to enforce for: "${codecKey}"`);
    }
    if (itemCount === 0) {
      log.warn("Rejecting write due to lack of data");
      try {
        return JSON.parse((await fs.readFile(getDataPath(file))).toString());
      } catch (e) {
        log.error(`Failed to read existing data ${file}`);
        return awaitedData;
      }
    }
    try {
      if (!isDryRun) {
        await write(file, awaitedData);
      } else {
        log.info("Skipping write due to dry run");
      }
      return awaitedData;
    } catch (e) {
      log.error(`Problem writing data: "${e.message}"`, isDebug ? e : "");
      return undefined;
    }
  } catch (e) {
    log.error(`Problem processing ${file}: ${e.message}`, isDebug ? e : "");
    return undefined;
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
    const issueUrl = await openGitHubIssue(codecKey, data, report);
    const body = `Issue: ${issueUrl}${SEPARATOR}${JSON.stringify(
      data,
      undefined,
      2
    )}${SEPARATOR}${report.join("\n")}`;
    await fs.writeFile(logPath, body);
  } catch (e) {
    log.error(`Problem writing error log: "${e.message}"`);
  }
}

const SEPARATOR = `\n\n${Array.from({ length: 10 })
  .map(() => "-")
  .join("")}\n\n`;

async function openGitHubIssue(codecKey: Codec, data: any, report: string[]) {
  if (!process.env.CI) {
    return "[Local issue]";
  }
  try {
    const { url } = await got(
      `https://api.github.com/repos/maael/temtem-api/issues`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        },
        body: JSON.stringify({
          title: `[${codecKey}] data codec failure`,
          body: `
${codecKey} data failed its codec check.

# Report

-\`${report.join("`\n-`")}\`

# Data

${"```json"}
${JSON.stringify(data, undefined, 2)}
${"```"}
        `,
          labels: ["bug", "data issue"],
          assignees: ["maael"]
        })
      }
    ).json();
    return url;
  } catch (e) {
    log.error(`Problem creating GitHub issue: "${e.message}"`);
    return "[No issue]";
  }
}
