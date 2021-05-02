import * as t from "io-ts";

const AreaInfo = t.type({
  temtem: t.string,
  areas: t.array(t.string),
  ratePercent: t.number,
  lumaRate: t.number,
  minSvs: t.number,
  eggTechPercent: t.number,
});

export const Codec = t.type({
  dateRange: t.string,
  startDate: t.string,
  endDate: t.string,
  startDateFormatted: t.string,
  endDateFormatted: t.string,
  tweet: t.string,
  land: t.array(AreaInfo),
  water: t.array(AreaInfo),
});

export const SaiparkList = t.array(Codec);

export type Saipark = t.TypeOf<typeof Codec>;
