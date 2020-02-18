import * as t from "io-ts";

const AreaInfo = t.type({
  temtem: t.string,
  lumaRate: t.number,
  minSvs: t.number,
  eggMoves: t.number
});

export const Codec = t.type({
  dateRange: t.string,
  startDate: t.string,
  endDate: t.string,
  land: t.array(AreaInfo),
  water: t.array(AreaInfo)
});

export const SaiparkList = t.array(Codec);

export type Saipark = t.TypeOf<typeof Codec>;
