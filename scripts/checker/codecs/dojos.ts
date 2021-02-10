import * as t from "io-ts";

export const Codec = t.type({
  name: t.string,
  wikiUrl: t.string,
  types: t.array(t.string),
  leader: t.type({
    name: t.string,
    temtem: t.array(t.type({ name: t.string }))
  })
});

export const DojoList = t.array(Codec);

export type Dojo = t.TypeOf<typeof Codec>;
