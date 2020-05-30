import * as t from "io-ts";

export const Codec = t.type({
  number: t.number,
  name: t.string,
  types: t.array(t.string),
  portraitWikiUrl: t.string,
  wikiUrl: t.string,
  stats: t.type({
    hp: t.number,
    sta: t.number,
    spd: t.number,
    atk: t.number,
    def: t.number,
    spatk: t.number,
    spdef: t.number,
    total: t.number
  }),
  traits: t.array(t.string),
  details: t.type({
    height: t.type({
      cm: t.number,
      inches: t.number
    }),
    weight: t.type({
      kg: t.number,
      lbs: t.number
    })
  }),
  techniques: t.array(
    t.type({
      name: t.string,
      source: t.union([
        t.literal("Levelling"),
        t.literal("TechniqueCourses"),
        t.literal("Breeding")
      ]),
      levels: t.union([t.number, t.undefined])
    })
  ),
  trivia: t.array(t.string),
  evolution: t.union([
    t.type({
      stage: t.number,
      evolutionTree: t.array(t.unknown),
      evolves: t.literal(true),
      type: t.literal("level")
    }),
    t.type({ evolves: t.literal(false) })
  ]),
  wikiPortraitUrlLarge: t.string,
  locations: t.array(
    t.type({
      location: t.string,
      place: t.string,
      note: t.string,
      island: t.string,
      frequency: t.string,
      level: t.string,
      freetem: t.type({
        minLevel: t.number,
        maxLevel: t.number,
        minPansuns: t.number,
        maxPansuns: t.number
      })
    })
  ),
  icon: t.string,
  lumaIcon: t.string,
  genderRatio: t.type({
    male: t.number,
    female: t.number
  }),
  catchRate: t.number,
  hatchMins: t.number,
  tvYields: t.type({
    hp: t.number,
    sta: t.number,
    spd: t.number,
    atk: t.number,
    def: t.number,
    spatk: t.number,
    spdef: t.number
  }),
  gameDescription: t.string
});

export const TemtemList = t.array(Codec);

export type Temtem = t.TypeOf<typeof Codec>;
