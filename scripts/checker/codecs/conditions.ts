import * as t from "io-ts";

export const ConditionCodec = t.type({
  name: t.string,
  description: t.string,
  icon: t.string
});

export const ConditionList = t.array(ConditionCodec);

export type Condition = t.TypeOf<typeof ConditionCodec>;
