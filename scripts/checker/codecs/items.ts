import * as t from "io-ts";

export const Codec = t.type({
  wikiImageUrl: t.string,
  largeWikiImageUrl: t.string,
  icon: t.string,
  name: t.string,
  wikiUrl: t.string,
  description: t.union([t.string, t.null]),
  effect: t.union([t.string, t.null]),
  location: t.union([t.string, t.null]),
  buyPrice: t.union([t.number, t.null]),
  sellPrice: t.union([t.number, t.null]),
  quest: t.union([t.string, t.null]),
  category: t.union([
    t.literal("general"),
    t.literal("capture"),
    t.literal("medicine"),
    t.literal("gear"),
    t.literal("course"),
    t.literal("key"),
    t.literal("quest")
  ])
});

export const ItemList = t.array(Codec);

export type Item = t.TypeOf<typeof Codec>;
