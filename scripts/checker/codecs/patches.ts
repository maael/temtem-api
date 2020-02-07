import * as t from "io-ts";

export const PatchCodec = t.type({
  name: t.string,
  version: t.string,
  url: t.string,
  date: t.string,
  patchInfo: t.type({
    fixes: t.array(t.string),
    improvements: t.array(t.string),
    features: t.array(t.string),
    balance: t.array(t.string)
  })
});

export const PatchList = t.array(PatchCodec);

export type Patch = t.TypeOf<typeof PatchCodec>;
