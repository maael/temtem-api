import * as t from "io-ts";

export const Codec = t.type({
  number: t.string,
  technique: t.string,
  type: t.string,
  location: t.string,
  locationType: t.union([t.literal("quest"), t.literal("found")])
});

export const TrainingCourseList = t.array(Codec);

export type TrainingCourse = t.TypeOf<typeof Codec>;
