import * as t from "io-ts";

export const Codec = t.type({
  name: t.string,
  wikiUrl: t.string,
  description: t.string,
  effect: t.string,
});

export const TraitList = t.array(Codec);

export type Trait = t.TypeOf<typeof Codec>;
