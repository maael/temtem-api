import * as t from "io-ts";

export const Codec = t.type({
  name: t.string,
  quantity: t.number,
  wikiUrl: t.string,
  wikiImageUrl: t.string,
  effectDescription: t.string,
  requirement: t.string,
  freedTemtem: t.number,
  duration: t.string,
  startDate: t.string,
  endDate: t.string,
});

export const FreetemRewardList = t.array(Codec);

export type FreetemReward = t.TypeOf<typeof Codec>;
