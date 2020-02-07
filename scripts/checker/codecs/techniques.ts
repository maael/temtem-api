import * as t from "io-ts";

const Priority = t.union([
  t.literal("ultra"),
  t.literal("veryhigh"),
  t.literal("high"),
  t.literal("normal"),
  t.literal("low"),
  t.literal("verylow"),
  t.literal("unknown")
]);

export const Codec = t.type({
  name: t.string,
  wikiUrl: t.string,
  type: t.string,
  class: t.string,
  damage: t.number,
  staminaCost: t.number,
  hold: t.number,
  priority: Priority,
  synergy: t.string,
  synergyEffect: t.string,
  synergyEffectDamage: t.number,
  targets: t.string,
  description: t.string
});

export const TechniqueList = t.array(Codec);

export type Technique = t.TypeOf<typeof Codec>;
