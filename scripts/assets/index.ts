import getTypeIcons from "./getTypeIcons";
import getTemPortraitsSmall from "./getTemPortraitsSmall";
import getTemPortraitsLarge from "./getTemPortraitsLarge";
import getConditionIcons from "./getConditionIcons";
import getGearIcons from "./getGearIcons";
import getRenders from "./getRenders";
import * as log from "../util/log";

(async () => {
  await getTypeIcons();
  await getTemPortraitsSmall();
  await getTemPortraitsLarge();
  await getConditionIcons();
  await getGearIcons();
  await getRenders();
})().catch(e => {
  log.error(e);
  throw e;
});
