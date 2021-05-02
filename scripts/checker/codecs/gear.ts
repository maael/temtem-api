import * as t from "io-ts";

export const GearCodec = t.type({
  name: t.string,
  wikiUrl: t.string,
  wikiIconUrl: t.string,
  icon: t.string,
  category: t.string,
  consumable: t.boolean,
  limitedQuantity: t.boolean,
  purchasable: t.boolean,
  buyPrice: t.number,
  description: t.string,
  gameDescription: t.string,
});

export const GearList = t.array(GearCodec);

export type Gear = t.TypeOf<typeof GearCodec>;
