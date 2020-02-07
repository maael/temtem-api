import { promises as fs } from "fs";
import { PathReporter } from "io-ts/lib/PathReporter";
import { GearList } from "./codecs/gear";
import { ConditionList } from "./codecs/conditions";
import { PatchList } from "./codecs/patches";
import { DyeList } from "./codecs/dyes";
import { TypeList } from "./codecs/types";
import { TraitList } from "./codecs/traits";
import { CosmeticList } from "./codecs/cosmetics";
import { QuestList } from "./codecs/quests";
import { TechniqueList } from "./codecs/techniques";
import { Codec as WeaknessTable } from "./codecs/weaknesses";
import * as log from "../util/log";

const codecMap = {
  gear: GearList,
  conditions: ConditionList,
  patches: PatchList,
  dyes: DyeList,
  types: TypeList,
  traits: TraitList,
  cosmetics: CosmeticList,
  quests: QuestList,
  techniques: TechniqueList,
  weaknesses: WeaknessTable
};

(async () => {
  const dataDir = __dirname + "/../../data/";
  const dataFiles = (await fs.readdir(dataDir)).filter(
    i => i.endsWith(".json") && !i.startsWith("summary")
  );
  dataFiles.forEach(i => {
    const name = i
      .split(".")
      .slice(0, -1)
      .join("");
    const codec = codecMap[name];
    if (codec) {
      let data;
      try {
        data = require(`${dataDir}/${i}`);
      } catch (e) {
        log.warn("Could not read data file:", `${dataDir}/${i}`);
      }
      const result = codec.decode(data);
      log.info(PathReporter.report(result));
    } else {
      log.warn("Missing codec for:", name);
    }
  });
})().catch(e => {
  log.error(e);
  process.exit(0);
});
