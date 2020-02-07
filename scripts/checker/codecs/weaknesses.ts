import * as t from "io-ts";

const TypeName = t.union([
  t.literal("Neutral"),
  t.literal("Fire"),
  t.literal("Water"),
  t.literal("Nature"),
  t.literal("Electric"),
  t.literal("Earth"),
  t.literal("Mental"),
  t.literal("Wind"),
  t.literal("Digital"),
  t.literal("Melee"),
  t.literal("Crystal"),
  t.literal("Toxic")
]);

export const Codec = t.record(TypeName, t.record(TypeName, t.number));

export type WeaknessTable = t.TypeOf<typeof Codec>;
