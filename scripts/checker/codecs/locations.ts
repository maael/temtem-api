import * as t from "io-ts";

const LocationTypes = t.union([
  t.literal("island"),
  t.literal("route"),
  t.literal("townorvillage"),
  t.literal("landmark"),
]);

const LocationOfType = t.type({
  name: t.string,
  wikiUrl: t.string,
  type: LocationTypes,
});

export const Codec = t.type({
  name: t.string,
  wikiUrl: t.string,
  description: t.string,
  temtemTypes: t.array(t.string),
  type: LocationTypes,
  routes: t.array(LocationOfType),
  townsAndVillages: t.array(LocationOfType),
  landmarks: t.array(LocationOfType),
  temtem: t.array(t.string),
  trivia: t.array(t.string),
});

export const LocationList = t.array(Codec);

export type Location = t.TypeOf<typeof Codec>;
