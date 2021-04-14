import getTypeIcons from "./getTypeIcons";
import getTemPortraitsSmall from "./getTemPortraitsSmall";
import getTemPortraitsLarge from "./getTemPortraitsLarge";
import getConditionIcons from "./getConditionIcons";
import getGearIcons from "./getGearIcons";
import getItemIcons from "./getItemIcons";
import getRenders from "./getRenders";
import * as log from "../util/log";

const args = process.argv.slice(2);
const filter = args
  .filter(i => !i.startsWith("-"))
  .map(i => i.split(",").map(t => t.trim()))
  .reduce((acc, arr) => acc.concat(arr), []);

async function runIfActive(k: string, fn: () => Promise<void>) {
  if (filter.length === 0 || filter.includes(k)) {
    console.info("[asset]", "[start]", k);
    await fn();
    console.info("[asset]", "[end]", k);
  } else {
    console.info("[asset]", "[skip]", k);
  }
}

(async () => {
  await runIfActive("types", getTypeIcons);
  await runIfActive("temsmall", getTemPortraitsSmall);
  await runIfActive("temlarge", getTemPortraitsLarge);
  await runIfActive("conditions", getConditionIcons);
  await runIfActive("gear", getGearIcons);
  await runIfActive("items", getItemIcons);
  await runIfActive("renders", getRenders);
})().catch(e => {
  log.error(e);
  throw e;
});
