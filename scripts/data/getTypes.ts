import * as log from "../util/log";

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
  "Toxic",
];

export default async function getTypes() {
  log.info("Starting");
  try {
    log.info("Running");
    const types = ordering.map((t) => ({
      name: t,
      icon: `/images/icons/types/${t}.png`,
    }));
    return types;
  } catch (e) {
    log.error(e.message);
  }
}
