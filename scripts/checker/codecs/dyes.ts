import * as t from "io-ts";

export const Codec = t.type({
  wikiImageUrl: t.string,
  color: t.string,
  name: t.string,
  description: t.string,
  bundles: t.array(t.string),
});

export const DyeList = t.array(Codec);

export type Dye = t.TypeOf<typeof Codec>;
