export const typeExample = [
  {
    name: "Neutral",
    icon: "/images/icon/types/Neutral.png"
  }
];

export const conditionExample = [
  {
    name: "Cold",
    description:
      "If Cold is afflicted twice, the Temtem becomes Frozen. Frozen Temtem cannot attack, but they can rest normally. Cold and Frozen also serve to erase the Burnt Condition from a Temtem, while Burnt erases both Cold and Frozen",
    icon: "/images/icons/conditions/Cold.png"
  }
];

export const techniqueExample = [
  {
    name: "Crystal Dust",
    wikiUrl: "https://temtem.gamepedia.com/Crystal_Dust",
    type: "Crystal",
    class: "special",
    damage: 60,
    staminaCost: 11,
    hold: 0,
    priority: "high",
    syngery: "Wind",
    synergyEffect: 20,
    targets: "Single Other Target",
    description:
      'A miniature version of the "star-rain" that is said to have spawned the Archipelago.'
  }
];

export const traitExample = [
  {
    name: "Aerobic",
    wikiUrl: "https://temtem.gamepedia.com/Aerobic",
    description: "When attacking with Wind techniques, gets SPDEF- and SPD +."
  }
];

export const gearExample = [
  {
    name: "Aggressive DNA Strand",
    wikiUrl: "https://temtem.gamepedia.com/Aggressive_DNA_Strand",
    wikiIconUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/8/8f/AggressiveDNAStrand.png",
    icon: "/images/icons/gear/AggressiveDNAStrand.png",
    category: "Gear",
    consumable: true,
    limitedQuantity: false,
    purchasable: true,
    buyPrice: 10,
    description:
      "Aggressive DNA Strand This single-use DNA strand ensures the egg inherits the parent's ATK.",
    gameDescription: "NEEDS DESCRIPTION"
  }
];

export const knownTemtemExample = [
  {
    number: 113,
    name: "Ganki",
    types: ["Electric", "Wind"],
    portraitWikiUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/b/bc/Ganki.png/50px-Ganki.png",
    wikiUrl: "https://temtem.gamepedia.com/Ganki",
    stats: {
      hp: 38,
      sta: 46,
      spd: 61,
      atk: 57,
      def: 38,
      spatk: 62,
      spdef: 73,
      total: 375
    },
    traits: ["Botanophobia", "Cold-Natured"],
    details: {
      height: {
        cm: 105,
        inches: 41
      },
      weight: {
        kg: 14,
        lbs: 31
      }
    },
    techniques: [
      {
        name: "Sparks",
        source: "Levelling"
      },
      {
        name: "Nimble",
        source: "Levelling"
      },
      {
        name: "Wind Blade",
        source: "Levelling"
      },
      {
        name: "DC Beam",
        source: "Levelling"
      },
      {
        name: "Chain Lightning",
        source: "Levelling"
      },
      {
        name: "Drill Impact",
        source: "Levelling"
      },
      {
        name: "Electric Storm",
        source: "Levelling"
      },
      {
        name: "Turbo Choreography",
        source: "TechniqueCourses"
      },
      {
        name: "Misogi",
        source: "TechniqueCourses"
      },
      {
        name: "Noxious Bomb",
        source: "TechniqueCourses"
      },
      {
        name: "Tesla Prison",
        source: "Breeding"
      }
    ],
    trivia: [
      "Ganki was first revealed via Twitter.",
      "Ganki is a combination of ga (moth) + denki (electric current), both being Japanese words.",
      "Ganki has an emote on the official Temtem discord.",
      "Prior to alpha 0.2.5 Ganki learned hypnosis."
    ],
    evolution: {
      stage: 1,
      evolutionTree: [
        {
          number: 113,
          name: "Ganki",
          stage: 1,
          levels: 27
        },
        {
          number: 114,
          name: "Gazuma",
          stage: 2
        }
      ],
      evolves: true,
      type: "level"
    },
    wikiPortraitUrlLarge:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/b/bc/Ganki.png/250px-Ganki.png?version=d18706728e9cc3706caea19e24063ac4",
    icon: "/images/portraits/temtem/large/Ganki.png"
  }
];

export const weaknessesExample = {
  Neutral: {
    Neutral: 1,
    Fire: 1,
    Water: 1,
    Nature: 1,
    Electric: 1,
    Earth: 1,
    Mental: 0.5,
    Wind: 1,
    Digital: 1,
    Melee: 1,
    Crystal: 1,
    Toxic: 1
  },
  Fire: {
    Neutral: 1,
    Fire: 0.5,
    Water: 0.5,
    Nature: 2,
    Electric: 1,
    Earth: 0.5,
    Mental: 1,
    Wind: 1,
    Digital: 1,
    Melee: 1,
    Crystal: 2,
    Toxic: 1
  },
  Water: {
    Neutral: 1,
    Fire: 2,
    Water: 0.5,
    Nature: 0.5,
    Electric: 1,
    Earth: 2,
    Mental: 1,
    Wind: 1,
    Digital: 2,
    Melee: 1,
    Crystal: 1,
    Toxic: 0.5
  },
  Nature: {
    Neutral: 1,
    Fire: 0.5,
    Water: 2,
    Nature: 0.5,
    Electric: 1,
    Earth: 2,
    Mental: 1,
    Wind: 1,
    Digital: 1,
    Melee: 1,
    Crystal: 1,
    Toxic: 0.5
  },
  Electric: {
    Neutral: 1,
    Fire: 1,
    Water: 2,
    Nature: 0.5,
    Electric: 0.5,
    Earth: 0.5,
    Mental: 2,
    Wind: 2,
    Digital: 2,
    Melee: 1,
    Crystal: 0.5,
    Toxic: 1
  },
  Earth: {
    Neutral: 1,
    Fire: 2,
    Water: 0.5,
    Nature: 0.5,
    Electric: 2,
    Earth: 1,
    Mental: 1,
    Wind: 0.5,
    Digital: 1,
    Melee: 1,
    Crystal: 2,
    Toxic: 1
  },
  Mental: {
    Neutral: 2,
    Fire: 1,
    Water: 1,
    Nature: 1,
    Electric: 1,
    Earth: 1,
    Mental: 1,
    Wind: 1,
    Digital: 1,
    Melee: 2,
    Crystal: 0.5,
    Toxic: 1
  },
  Wind: {
    Neutral: 1,
    Fire: 1,
    Water: 1,
    Nature: 1,
    Electric: 0.5,
    Earth: 1,
    Mental: 1,
    Wind: 0.5,
    Digital: 1,
    Melee: 1,
    Crystal: 1,
    Toxic: 2
  },
  Digital: {
    Neutral: 1,
    Fire: 1,
    Water: 1,
    Nature: 1,
    Electric: 1,
    Earth: 1,
    Mental: 2,
    Wind: 1,
    Digital: 2,
    Melee: 2,
    Crystal: 1,
    Toxic: 1
  },
  Melee: {
    Neutral: 1,
    Fire: 1,
    Water: 1,
    Nature: 1,
    Electric: 1,
    Earth: 2,
    Mental: 0.5,
    Wind: 1,
    Digital: 1,
    Melee: 0.5,
    Crystal: 2,
    Toxic: 1
  },
  Crystal: {
    Neutral: 1,
    Fire: 0.5,
    Water: 1,
    Nature: 1,
    Electric: 2,
    Earth: 0.5,
    Mental: 2,
    Wind: 1,
    Digital: 1,
    Melee: 1,
    Crystal: 1,
    Toxic: 1
  },
  Toxic: {
    Neutral: 1,
    Fire: 1,
    Water: 2,
    Nature: 2,
    Electric: 1,
    Earth: 0.5,
    Mental: 1,
    Wind: 1,
    Digital: 0.5,
    Melee: 1,
    Crystal: 0.5,
    Toxic: 0.5
  }
};

export const weaknessCalculateExample = {
  attacking: "Electric",
  defending: ["Water", "Wind"],
  modifiers: [2, 2],
  result: 4
};

export const breedingExample = [];

export const patchesExample = [
  {
    name: "Temtem 0.5.5",
    version: "0.5.5",
    url: "https://crema.gg/temtem/temtem-0-5-5/",
    date: "25th January 2020",
    patchInfo: {
      fixes: [
        "Fixed not receiving the surfboard in the Beached Narwhal quest after delivering a Toxolotl.",
        "Fixed errors when changing the Squad order while they were being healed.",
        "The Tamer Info screen can now be closed even when there’s an error and it doesn’t display information.",
        "Fixed some interactions between moving platforms and opening eggs.",
        "Fixed Name Reservation missing icon.",
        "Fixed some dialogs."
      ],
      improvements: [],
      features: [],
      balance: ["Increased the price for all breeding gears."]
    }
  }
];
