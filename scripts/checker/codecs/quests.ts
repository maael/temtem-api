import * as t from "io-ts";

const MainQuestCodec = t.type({
  name: t.string,
  wikiUrl: t.string,
  type: t.literal("main"),
  steps: t.array(t.string),
  rewards: t.array(t.string),
  startingLocation: t.string,
  startingNPC: t.string,
  requirements: t.string,
});

const SideQuestCodec = t.type({
  name: t.string,
  wikiUrl: t.string,
  island: t.string,
  location: t.string,
  requirements: t.string,
  reward: t.string,
  type: t.literal("side"),
  steps: t.array(t.string),
  rewards: t.array(t.string),
  startingLocation: t.string,
  startingNPC: t.string,
});

const QuestCodec = t.union([MainQuestCodec, SideQuestCodec]);

export const QuestList = t.array(QuestCodec);

export type Quest = t.TypeOf<typeof QuestCodec>;
