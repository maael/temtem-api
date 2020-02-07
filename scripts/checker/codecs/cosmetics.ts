import * as t from "io-ts";

const CosmeticTypes = t.union([
  t.literal("head"),
  t.literal("top"),
  t.literal("bottom"),
  t.literal("set"),
  t.literal("bag")
]);

export const Codec = t.type({
  type: CosmeticTypes,
  wikiImageUrl: t.string,
  wikiUrl: t.string,
  name: t.string,
  location: t.string,
  cost: t.number,
  requirement: t.string,
  description: t.string
});

export const CosmeticList = t.array(Codec);

export type Cosmetic = t.TypeOf<typeof Codec>;
