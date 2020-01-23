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

export default async function getTypes() {
  log.info("Starting");
  try {
    log.info("Running");
    const types = ordering.map(t => ({
      name: t,
      icon: `/images/icon/types/${t}.png`
    }));
    await write("types", types);
    return types;
  } catch (e) {
    log.error(e.message);
  }
}
