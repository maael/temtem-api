import { GearList } from "./gear";
import { ConditionList } from "./conditions";
import { PatchList } from "./patches";
import { DyeList } from "./dyes";
import { TypeList } from "./types";
import { TraitList } from "./traits";
import { CosmeticList } from "./cosmetics";
import { QuestList } from "./quests";
import { TechniqueList } from "./techniques";
import { Codec as WeaknessTable } from "./weaknesses";
import { SaiparkList } from "./saipark";
import { LocationList } from "./locations";
import { TrainingCourseList } from "./trainingCourses";
import { CharacterList } from "./characters";
import { TemtemList } from "./temtem";
import { FreetemRewardList } from "./freetemRewards";
import { ItemList } from "./items";
import { DojoList } from "./dojos";

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
  weaknesses: WeaknessTable,
  saipark: SaiparkList,
  locations: LocationList,
  temtem: TemtemList,
  characters: CharacterList,
  trainingCourses: TrainingCourseList,
  freetemRewards: FreetemRewardList,
  items: ItemList,
  dojos: DojoList,
};

export type Codec = keyof typeof codecMap;

export default codecMap;
