import { graphql, buildSchema } from "graphql";
import cors from "../../../util/cors";

const conditions = require("../../../data/conditions.json");
const cosmetics = require("../../../data/cosmetics.json");
const dyes = require("../../../data/dyes.json");
const gear = require("../../../data/gear.json");
const patches = require("../../../data/patches.json");
const quests = require("../../../data/quests.json");
const saipark = require("../../../data/saipark.json");
const techniques = require("../../../data/techniques.json");
const traits = require("../../../data/traits.json");
const types = require("../../../data/types.json");
const summary = require("../../../data/summary.json");

const schema = buildSchema(`
  type Condition {
    name: String!
    description: String!
    icon: String!
  }
  enum CosmeticType {
    head,
    top,
    bottom,
    set,
    bag
  }
  type Cosmetic {
    type: CosmeticType!
    wikiImageUrl: String!
    wikiUrl: String!
    name: String!
    location: String!
    cost: Int!
    requirement: String!
    description: String!
  }
  type Dye {
    wikiImageUrl: String!
    color: String!
    name: String!
    description: String!
    bundles: [String!]!
  }
  type Gear {
    name: String!
    wikiUrl: String!
    wikiIconUrl: String!
    icon: String!
    category: String!
    consumable: Boolean!
    limitedQuantity: Boolean!
    purchasable: Boolean!
    buyPrice: Int!
    description: String!
    gameDescription: String!
  }
  type PatchInfo {
    fixes: [String!]!
    improvements: [String!]!
    features: [String!]!
    balance: [String!]!
  }
  type Patch {
    name: String!
    version: String!
    url: String!
    date: String!
    patchInfo: PatchInfo!
  }
  type SaiparkArea {
    temtem: String!
    lumaRate: Int!
    minSvs: Int!
    eggMoves: Int!
  }
  type Saipark {
    dateRange: String!
    startDate: String!
    endDate: String!
    land: [SaiparkArea!]!
    water: [SaiparkArea!]!
  }
  enum Priority {
    ultra,
    veryhigh,
    high,
    normal,
    low,
    verylow,
    unknown,
  }
  enum SynergyType {
    damage,
    buff,
    debuff,
    condition,
    priority,
    unknown,
  }
  type SynergyEffect {
    effect: String!
    damage: Int!
    type: SynergyType!
  }
  type Technique {
    name: String!
    wikiUrl: String!
    type: String!
    class: String!
    damage: Int!
    staminaCost: Int!
    hold: Int!
    priority: Priority!
    synergy: String!
    synergyEffects: [SynergyEffect!]!,
    targets: String!
    description: String!
  }
  type Trait {
    name: String!
    wikiUrl: String!
    description: String!
  }
  type Type {
    name: String!
    icon: String!
  }
  type DataStat {
    mtime: String!
    name: String!
  }
  type Summary {
    mostRecent: String!
    dataStats: [DataStat!]!
  }
  type MainQuest {
    name: String!
    wikiUrl: String!
    steps: [String!]!
    rewards: [String!]!
    startingLocation: String!
    startingNPC: String!
    requirements: String!
  }
  type SideQuest {
    name: String!
    wikiUrl: String!
    island: String!
    location: String!
    requirements: String!
    reward: String!
    steps: [String!]!
    rewards: [String!]!
    startingLocation: String!
    startingNPC: String!
  }
  type Quest {
    main: [MainQuest!]!
    side: [SideQuest!]!
  }
  enum LocationTypes {
    island,
    route,
    townorvillage,
    landmark
  }
  type LocationOfType {
    name: String!
    wikiUrl: String!
    type: LocationTypes
  }
  type Location {
    name: String!
    wikiUrl: String!
    description: String!
    temtemTypes: [String!]!
    type: LocationTypes,
    routes: [LocationOfType!]!
    townsAndVillages: [LocationOfType!]!
    landmarks: [LocationOfType!]!
    temtem: [String!]!
    trivia: [String!]!
  }
  type Query {
    conditions: [Condition!]!
    cosmetics: [Cosmetic!]!
    dyes: [Dye!]!
    gear: [Gear!]!
    patches: [Patch!]!
    quests: Quest!
    saipark: [Saipark!]!
    locations: [Location!]!
    summary: Summary!
    techniques: [Technique!]!
    traits: [Trait!]!
    types: [Type!]!
  }
`);

const root = {
  conditions: () => conditions,
  cosmetics: () => cosmetics,
  dyes: () => dyes,
  gear: () => gear,
  patches: () => patches,
  quests: () => ({
    main: quests.filter(({ type }) => type === "main"),
    side: quests.filter(({ type }) => type === "side")
  }),
  saipark: () => saipark,
  summary: () => summary,
  techniques: () => techniques,
  traits: () => traits,
  types: () => types
};

export default cors(async (req, res) => {
  const query = req.body.query;
  const response = await graphql(schema, query, root);

  res.end(JSON.stringify(response));
});
