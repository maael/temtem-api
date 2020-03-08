import fetch from "isomorphic-fetch";

export default async function log(data: any) {
  try {
    if (process.env.OAK_SECRET_TOKEN) {
      await fetch(
        `https://oak.mael.tech/api?token=${process.env.OAK_SECRET_TOKEN}`,
        {
          method: "POST",
          body: JSON.stringify({
            appName: "temtem-api",
            message: "data",
            ...data
          })
        }
      );
    }
  } catch (e) {
    console.error("[log error]", e.message);
  }
}
