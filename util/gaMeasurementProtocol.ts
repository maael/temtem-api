import got from "got";
import qs from "querystring";
import { NextApiRequest } from "next";
const BASE = "https://www.google-analytics.com/collect";

export async function sendPageView(req: NextApiRequest, page: string) {
  const clientId =
    req.connection.remoteAddress || req.headers["x-forwarded-for"];
  try {
    const qss = qs.encode({
      v: 1,
      tid: process.env.GA_TOKEN,
      cid: clientId,
      t: "pageview",
      dh: req.headers.host,
      dp: `/api/${page}`,
      dt: page,
      ds: "server"
    });
    if (!process.env.GA_TOKEN) {
      console.info("ga:pageView", qss);
      return;
    }
    const res = await got.post(BASE, { body: qss });
    if (res.statusCode !== 200) {
      console.info("not ok", res.statusCode, res.body);
    }
  } catch (e) {
    console.error("Failed to send GA hit", e);
  }
}
