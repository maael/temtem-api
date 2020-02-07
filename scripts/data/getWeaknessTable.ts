import got from "got";
import cheerio from "cheerio";
import * as log from "../util/log";
import write from "../util/write";

const ordering = [
  "Neutral",
  "Fire",
  "Water",
  "Nature",
  "Electric",
  "Earth",
  "Mental",
  "Wind",
  "Digital",
  "Melee",
  "Crystal",
  "Toxic"
];

export default async function getWeaknessTable() {
  try {
    log.info("getting weaknesses");
    const res = await got(
      "https://temtem.gamepedia.com/Temtem_Types#Strengths_and_Weaknesses"
    );
    const $ = cheerio.load(res.body);
    const $table = $("#ttw-type-interactions-dynamic");
    const table: any = {};
    $table
      .find("tbody")
      .children("tr")
      .each((i, el) => {
        if (i === 0) return;
        const row: any = {};
        $(el)
          .children("td")
          .each((j, td) => {
            const value = Number(
              $(td)
                .text()
                .trim()
                .replace("x", "")
            );
            row[ordering[j]] = value === 0 ? 1 : value;
          });
        table[ordering[i - 1]] = row;
      });
    await write("weaknesses", table);
    return table;
  } catch (e) {
    log.error(e.message);
  }
}
