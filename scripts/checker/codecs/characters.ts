import * as t from "io-ts";

export const Codec = t.type({
  name: t.string,
  wikiUrl: t.string
});

export const CharacterList = t.array(Codec);

export type Character = t.TypeOf<typeof Codec>;
