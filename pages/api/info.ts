import got from "got";
import { sendPageView } from "../../util/gaMeasurementProtocol";
const summary = require("../../data/summary.json");

export default async (req, res) => {
  // tslint:disable-next-line:no-floating-promises
  sendPageView(req, "info");
  const [lastChecked, lastBuildStatus] = await Promise.all([
    getCiInfo(),
    getCiMostRecentStatus()
  ]);
  res.json({
    lastChecked,
    lastUpdated: summary.mostRecent,
    lastBuildStatus
  });
};

async function getCiInfo() {
  try {
    const TOKEN = process.env.CIRCLECI;
    const url = `https://circleci.com/api/v1.1/project/gh/maael/temtem-api?circle-token=${TOKEN}&limit=50&filter=completed`;
    const res = await got<any>(url, { responseType: "json" });
    const updaterJobs = res.body.filter(
      item => item.build_parameters.CIRCLE_JOB === "updater"
    );
    const mostRecent = updaterJobs[0];
    if (mostRecent) {
      return mostRecent.stop_time;
    } else {
      return undefined;
    }
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

async function getCiMostRecentStatus() {
  try {
    const TOKEN = process.env.CIRCLECI;
    const url = `https://circleci.com/api/v1.1/project/gh/maael/temtem-api?circle-token=${TOKEN}&limit=1`;
    const res = await got<any>(url, { responseType: "json" });
    const mostRecent = res.body[0];
    if (mostRecent) {
      return mostRecent.status;
    } else {
      return undefined;
    }
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
