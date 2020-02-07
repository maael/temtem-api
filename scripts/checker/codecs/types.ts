import * as t from "io-ts";

export const Codec = t.type({
  name: t.string,
  icon: t.string
});

export const TypeList = t.array(Codec);

export type Type = t.TypeOf<typeof Codec>;
