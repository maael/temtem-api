export const typeExample = [
  {
    name: "Neutral",
    icon: "/images/icons/types/Neutral.png",
  },
];

export const conditionExample = [
  {
    name: "Cold",
    description:
      "If Cold is afflicted twice, the Temtem becomes Frozen. Frozen Temtem cannot attack, but they can rest normally. Cold and Frozen also serve to erase the Burnt Condition from a Temtem, while Burnt erases both Cold and Frozen",
    icon: "/images/icons/conditions/Cold.png",
  },
];

export const locationExample = [
  {
    name: "Deniz",
    wikiUrl: "https://temtem.wiki.gg/wiki/Deniz",
    description:
      "Deniz is a Mediterranean paradise of glittering seas where Water and Wind Temtem abound. Walk the streets of Turquesa, explore the ruins of an ancient fort or just chill on the shores of Indigo Lake.",
    temtemTypes: ["Water", "Wind"],
    type: "island",
    routes: [
      {
        name: "Prasine Coast",
        wikiUrl: "https://temtem.wiki.gg/wiki/Prasine_Coast",
        type: "route",
      },
      {
        name: "Thalassian Cliffs",
        wikiUrl: "https://temtem.wiki.gg/wiki/Thalassian_Cliffs",
        type: "route",
      },
      {
        name: "The Gifted Bridges",
        wikiUrl: "https://temtem.wiki.gg/wiki/The_Gifted_Bridges",
        type: "route",
      },
      {
        name: "Sillaro River",
        wikiUrl: "https://temtem.wiki.gg/wiki/Sillaro_River",
        type: "route",
      },
    ],
    townsAndVillages: [
      {
        name: "Zadar",
        wikiUrl: "https://temtem.wiki.gg/wiki/Zadar",
        type: "townorvillage",
      },
      {
        name: "Briçal de Mar",
        wikiUrl: "https://temtem.wiki.gg/wiki/Bri%C3%A7al_de_Mar",
        type: "townorvillage",
      },
      {
        name: "Arissola",
        wikiUrl: "https://temtem.wiki.gg/wiki/Arissola",
        type: "townorvillage",
      },
      {
        name: "Turquesa",
        wikiUrl: "https://temtem.wiki.gg/wiki/Turquesa",
        type: "townorvillage",
      },
    ],
    landmarks: [
      {
        name: "Sillaro",
        wikiUrl: "https://temtem.wiki.gg/wiki/Sillaro",
        type: "landmark",
      },
      {
        name: "Windward Fort",
        wikiUrl: "https://temtem.wiki.gg/wiki/Windward_Fort",
        type: "landmark",
      },
      {
        name: "Aguamarina Caves",
        wikiUrl: "https://temtem.wiki.gg/wiki/Aguamarina_Caves",
        type: "landmark",
      },
      {
        name: "Indigo Lake",
        wikiUrl: "https://temtem.wiki.gg/wiki/Indigo_Lake",
        type: "landmark",
      },
      {
        name: "Arissola Dojo",
        wikiUrl: "https://temtem.wiki.gg/wiki/Arissola_Dojo",
        type: "landmark",
      },
      {
        name: "Saipark",
        wikiUrl: "https://temtem.wiki.gg/wiki/Saipark",
        type: "landmark",
      },
    ],
    temtem: [
      "Swali",
      "Tateru",
      "Paharo",
      "Paharac",
      "Fomu",
      "Wiplump",
      "Skail",
      "Skunch",
      "Kaku",
      "Saku",
      "Ganki",
      "Saipat",
      "Umishi",
      "Kalazu",
      "Kalabyss",
      "Pewki",
      "Piraniant",
      "Barnshe",
      "Nessla",
      "Oceara",
      "Pigepic",
    ],
    trivia: [
      'The inspiration of Deniz is a melting pot relating to the Mediterranean Sea, the most predominant cultures being Spain, Italy, and Turkey. The island\'s name itself means "sea" in Turkish. Several placenames are Spanish, and the fact that its the starting region might allude to Crema being based of Madrid.',
      "Deniz was the first playable island to be featured in the game. During Alpha 1.0, it was the only explorable island.",
    ],
  },
];

export const techniqueExample = [
  {
    name: "Crystal Dust",
    wikiUrl: "https://temtem.wiki.gg/wiki/Crystal_Dust",
    type: "Crystal",
    class: "Special",
    classIcon: "/images/icons/technique/Special.png",
    damage: 60,
    staminaCost: 11,
    hold: 0,
    priority: "high",
    priorityIcon: "/images/icons/priority/high.png",
    synergy: "Wind",
    synergyEffects: [
      {
        effect: "+20 Base Power",
        type: "damage",
        damage: 20,
      },
      {
        effect: "+1 Priority",
        type: "priority",
        damage: 0,
      },
    ],
    targets: "Single Other Target",
    description:
      'A miniature version of the "star-rain" that is said to have spawned the Archipelago.',
  },
];

export const traitExample = [
  {
    name: "Avenger",
    wikiUrl: "https://temtem.wiki.gg/wiki/Avenger",
    description:
      "When an ally is knocked-out, increases SPATK and SPD by 1 stage.",
    effect:
      "Increase SPATK and SPD by one stage whenever an ally temtem is knocked out.",
  },
];

export const questExample = [
  {
    name: "Adventure in the Myrisles",
    wikiUrl: "https://temtem.wiki.gg/wiki/Adventure_in_the_Myrisles",
    type: "main",
    steps: [
      "Find Rawiri at his Dojo in Mokupuni.",
      "Go to Mokupuni and beat Dojo Master Rawiri",
      "Investigate what is going on at the Giant Banyan.",
      "Ambush the off-duty Belsotos at the pond.",
      "Meet Carlos outside the Giant Banyan",
      "Infiltrate the Giant Banyan.",
      "Reach the Anak Volcano and stop the eruption.",
      "Put an end to Dr. Hamijo's dastardly plan!",
      "Time to return to Nanga and Check on Tihani...",
      "Beat Tihani to prove your mettle.",
      "Fly to Kisiwa on the Narwhal",
    ],
    rewards: [
      "Lift key",
      "Belsoto grunt uniform",
      "Crystal skates",
      "Anahir",
      "Deendre",
    ],
    startingLocation: "Nanga",
    startingNPC: "",
    requirements: "",
  },
  {
    name: "Paparazzo",
    wikiUrl: "https://temtem.wiki.gg/wiki/Paparazzo",
    island: "Omninesia",
    location: "Mokupuni",
    requirements: "Lift key",
    reward: "Pillow",
    type: "side",
    steps: [
      "Locate the famous Visesia in Citerior Omninesia",
      "Talk to Paparazzo.",
    ],
    rewards: ["Pillow"],
    startingLocation: "Mokupuni or The Flywalk",
    startingNPC: "Paparazzo or Visesia",
  },
];

export const gearExample = [
  {
    name: "Aggressive DNA Strand",
    wikiUrl: "https://temtem.wiki.gg/wiki/Aggressive_DNA_Strand",
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
    gameDescription: "NEEDS DESCRIPTION",
  },
];

export const knownTemtemExample = [
  {
    number: 113,
    name: "Ganki",
    types: ["Electric", "Wind"],
    portraitWikiUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/b/bc/Ganki.png/50px-Ganki.png",
    wikiUrl: "https://temtem.wiki.gg/wiki/Ganki",
    stats: {
      hp: 38,
      sta: 46,
      spd: 61,
      atk: 57,
      def: 38,
      spatk: 62,
      spdef: 73,
      total: 375,
    },
    traits: ["Botanophobia", "Cold-Natured"],
    details: {
      height: {
        cm: 105,
        inches: 41,
      },
      weight: {
        kg: 14,
        lbs: 31,
      },
    },
    techniques: [
      {
        name: "Sparks",
        source: "Levelling",
        levels: 1,
      },
      {
        name: "Nimble",
        source: "Levelling",
        levels: 3,
      },
      {
        name: "Wind Blade",
        source: "Levelling",
        levels: 5,
      },
      {
        name: "DC Beam",
        source: "Levelling",
        levels: 7,
      },
      {
        name: "Chain Lightning",
        source: "Levelling",
        levels: 16,
      },
      {
        name: "Drill Impact",
        source: "Levelling",
        levels: 22,
      },
      {
        name: "Electric Storm",
        source: "Levelling",
        levels: 32,
      },
      {
        name: "Turbo Choreography",
        source: "TechniqueCourses",
      },
      {
        name: "Misogi",
        source: "TechniqueCourses",
      },
      {
        name: "Noxious Bomb",
        source: "TechniqueCourses",
      },
      {
        name: "Tesla Prison",
        source: "Breeding",
      },
    ],
    trivia: [
      "Ganki was first revealed via Twitter.",
      "Ganki is a combination of ga (moth) + denki (electric current), both being Japanese words.",
      "Ganki has an emote on the official Temtem discord.",
      "Prior to alpha 0.2.5 Ganki learned hypnosis.",
    ],
    evolution: {
      stage: 1,
      evolutionTree: [
        {
          number: 113,
          name: "Ganki",
          stage: 1,
          levels: 27,
          trading: false,
          traitMapping: {
            Botanophobia: "Receptive",
            "Cold-Natured": "Fast Charge",
          },
        },
        {
          number: 114,
          name: "Gazuma",
          stage: 2,
          traitMapping: {
            Receptive: "Receptive",
            "Fast Charge": "Fast Charge",
          },
        },
      ],
      evolves: true,
      type: "level",
    },
    wikiPortraitUrlLarge:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/b/bc/Ganki.png/250px-Ganki.png?version=d18706728e9cc3706caea19e24063ac4",
    locations: [
      {
        location: "Thalassian Cliffs",
        place: "Thalassian Cliffs",
        note: "",
        island: "Deniz",
        frequency: "Common",
        level: "5-8",
        freetem: {
          minLevel: 5,
          maxLevel: 8,
          minPansuns: 33,
          maxPansuns: 40,
        },
      },
      {
        location: "Windward Fort",
        place: "Windward Fort",
        note: "",
        island: "Deniz",
        frequency: "Common",
        level: "12-14",
        freetem: {
          minLevel: 12,
          maxLevel: 14,
          minPansuns: 50,
          maxPansuns: 55,
        },
      },
    ],
    icon: "/images/portraits/temtem/large/Ganki.png",
    lumaIcon: "/images/portraits/temtem/luma/large/Ganki.png",
    genderRatio: {
      male: 50,
      female: 50,
    },
    catchRate: 120,
    hatchMins: 21,
    tvYields: {
      hp: 0,
      sta: 0,
      spd: 0,
      atk: 1,
      def: 0,
      spatk: 0,
      spdef: 0,
    },
    gameDescription:
      "Many Cipanki legends mention the kind but powerful Ganki as mountain spirits, mythologically related to lightning and whirlwinds. Although they are no longer revered as kami, the Cipanki still appreciate and breed them.",
    wikiRenderStaticUrl: "",
    wikiRenderAnimatedUrl: "",
    wikiRenderStaticLumaUrl: "",
    wikiRenderAnimatedLumaUrl: "",
    renderStaticImage: "",
    renderStaticLumaImage: "",
    renderAnimatedImage: "",
    renderAnimatedLumaImage: "",
  },
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
    Toxic: 1,
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
    Toxic: 1,
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
    Toxic: 0.5,
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
    Toxic: 0.5,
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
    Toxic: 1,
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
    Toxic: 1,
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
    Toxic: 1,
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
    Toxic: 2,
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
    Toxic: 1,
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
    Toxic: 1,
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
    Toxic: 1,
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
    Toxic: 0.5,
  },
};

export const weaknessCalculateExample = {
  attacking: "Electric",
  defending: ["Water", "Wind"],
  modifiers: [2, 2],
  result: 4,
};

export const breedingExample = [];

export const patchesExample = [
  {
    name: "Temtem 0.5.5",
    version: "0.5.5",
    url: "https://crema.gg/temtem/temtem-0-5-5/",
    date: "2020-1-25",
    patchInfo: {
      fixes: [
        "Fixed not receiving the surfboard in the Beached Narwhal quest after delivering a Toxolotl.",
        "Fixed errors when changing the Squad order while they were being healed.",
        "The Tamer Info screen can now be closed even when there’s an error and it doesn’t display information.",
        "Fixed some interactions between moving platforms and opening eggs.",
        "Fixed Name Reservation missing icon.",
        "Fixed some dialogs.",
      ],
      improvements: [],
      features: [],
      balance: ["Increased the price for all breeding gears."],
    },
  },
];

export const cosmeticsExample = [
  {
    type: "bottom",
    wikiImageUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/d/dc/TieDownPants.png/100px-TieDownPants.png",
    wikiUrl: "https://temtem.wiki.gg/wiki/Tie_Down_Pants",
    name: "Tie Down Pants",
    location: "Mokupuni",
    cost: 24999,
    requirement: "",
    description:
      "Practical shorts, enhanced with tied rope details for a rustic touch.",
  },
];

export const dyesExample = [
  {
    wikiImageUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/c/cc/Seaqueendye.png/100px-Seaqueendye.png",
    color: "#f79935",
    name: "Sea Queen Dye",
    description: "The hue of secrets as deep as the Sillaro.",
    bundles: ["Fury of Anak", "Sillaro Romance"],
  },
];

export const saipark = [
  {
    dateRange: "Feb 17 - Feb 23, 2020",
    startDate: "2020-02-17T00:00:00.000Z",
    endDate: "2020-02-23T00:00:00.000Z",
    land: [
      {
        temtem: "Barnshe",
        lumaRate: 2,
        minSvs: 0,
        eggMoves: 0,
      },
    ],
    water: [
      {
        temtem: "Oceara",
        lumaRate: 2,
        minSvs: 0,
        eggMoves: 0,
      },
    ],
  },
];

export const freetemExample = {
  temtem: "Ganki",
  level: 30,
  catchRate: 120,
  reward: 95,
};

export const characterExample = [
  {
    name: "Lady Lottie",
    wikiUrl: "https://temtem.wiki.gg/wiki/Lady_Lottie",
  },
];

export const trainingCourseExample = [
  {
    number: "TC001",
    technique: "Tsunami",
    type: "Water",
    location: "Complete Gone with the Sillaro. Requires the Surfboard.",
    locationType: "quest",
  },
  {
    number: "TC002",
    technique: "Stone Wall",
    type: "Earth",
    location:
      "Windward Fort prison floor, cell in the water. Requires the Surfboard.",
    locationType: "found",
  },
];

export const freetemRewardExample = [
  {
    name: "Telomere Hack - SPD",
    quantity: 2,
    wikiUrl: "https://temtem.wiki.gg/wiki/Telomere_Hack_-_SPD",
    wikiImageUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/a/a3/TelomereHackSPD.png/75px-TelomereHackSPD.png",
    effectDescription:
      "This experimental genefix alters chromosomes in Temtem DNA, adding 1 SV to SPD.",
    requirement: "Free 200 Temtem.",
    freedTemtem: 200,
    duration: "March 9 - March 15",
    startDate: "2020-03-09T00:00:00.000Z",
    endDate: "2020-03-15T00:00:00.000Z",
  },
];

export const itemExample = [
  {
    wikiImageUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/a/a2/SmokeBomb.png/65px-SmokeBomb.png",
    name: "Smoke Bomb",
    wikiUrl: "https://temtem.wiki.gg/wiki//Smoke_Bomb",
    description: "Teleports the Player to the last visited Temporium.",
    effect: null,
    location: null,
    buyPrice: 120,
    sellPrice: 83,
    quest: null,
    category: "general",
  },
  {
    wikiImageUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/b/b1/TemCardPlus.png/75px-TemCardPlus.png",
    name: "TemCard+",
    wikiUrl: "https://temtem.wiki.gg/wiki//TemCard%2B",
    description:
      "Allows to capture and Tame Temtem with an increased catch rate.",
    effect: null,
    location: null,
    buyPrice: 80,
    sellPrice: 55,
    quest: null,
    category: "capture",
  },
  {
    wikiImageUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/4/4d/TelomereHackSPDEF.png/75px-TelomereHackSPDEF.png",
    name: "Telomere Hack - SPDEF",
    wikiUrl: "https://temtem.wiki.gg/wiki//Telomere_Hack_-_SPDEF",
    description:
      "This experimental genefix alters chromosomes in Temtem DNA, adding 1 SV to SPDEF",
    effect: null,
    location: null,
    buyPrice: null,
    sellPrice: 4900,
    quest: null,
    category: "medicine",
  },
  {
    wikiImageUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/9/91/Engineered_DNA_Strand.png/75px-Engineered_DNA_Strand.png",
    name: "Engineered DNA Strand",
    wikiUrl: "https://temtem.wiki.gg/wiki//Engineered_DNA_Strand",
    description: null,
    effect:
      "This single-use DNA strand ensures the egg inherits the parent´s trait slot.",
    location: "Breeding Center shopkeeper.",
    buyPrice: null,
    sellPrice: null,
    quest: null,
    category: "gear",
  },
  {
    wikiImageUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/a/a9/TechniqueCourse.png/75px-TechniqueCourse.png",
    name: "TC018: Major Slash",
    wikiUrl: "https://temtem.wiki.gg/wiki//TC018:_Major_Slash",
    description: null,
    effect: "Allows Major Slash to be learned by a Temtem.",
    location: null,
    buyPrice: null,
    sellPrice: null,
    quest: null,
    category: "course",
  },
  {
    wikiImageUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/2/27/EggTimer.png/75px-EggTimer.png",
    name: "Egg Timer",
    wikiUrl: "https://temtem.wiki.gg/wiki//Egg_Timer",
    description: null,
    effect: "Used to tell when your eggs hatch",
    location: null,
    buyPrice: null,
    sellPrice: null,
    quest: null,
    category: "key",
  },
  {
    wikiImageUrl:
      "https://gamepedia.cursecdn.com/temtem_gamepedia_en/thumb/d/dd/Unknown.png/75px-Unknown.png",
    name: "Ancient Idol",
    wikiUrl: "https://temtem.wiki.gg/wiki//Ancient_Idol",
    description: null,
    effect: null,
    location: null,
    buyPrice: null,
    sellPrice: null,
    quest: "Liberate Matthew",
    category: "quest",
  },
];

export const dojosExample = [
  {
    name: "Arissola Dojo",
    wikiUrl: "https://temtem.wiki.gg/wiki/Arissola_Dojo",
    types: ["Wind", "Water"],
    leader: {
      name: "Sophia",
      temtem: [
        {
          level: 17,
          name: "Kalabyss",
          number: 128,
          trait: "Botanophobia",
          techniques: [
            "Aqua Stone",
            "Strangle",
            "Water Blade",
            "Tentacle Whip",
          ],
        },
        {
          level: 17,
          name: "Loali",
          number: 11,
          trait: "Botanist",
          techniques: ["Toxic Spores", "Wind Blade", "Urushiol", "Tenderness"],
        },
        {
          level: 18,
          name: "Sparzy",
          number: 82,
          trait: "Last Rush",
          techniques: ["Psychosis", "Tesla Prison", "Held Anger", "DC Beam"],
        },
        {
          level: 19,
          name: "Pigepic",
          number: 141,
          trait: "Friendship",
          techniques: ["Heavy Blow", "Nimble", "Nibble", "Scratch"],
        },
        {
          level: 21,
          name: "Tuwai",
          number: 130,
          trait: "Spoilsport",
          techniques: [
            "Multiple Pecks",
            "Wind Burst",
            "Feather Gatling",
            "Shrill Voice",
          ],
        },
        {
          level: 22,
          name: "Oceara",
          number: 115,
          trait: "Hydrologist",
          techniques: [
            "Ice Shuriken",
            "Tsunami",
            "High-pressure Water",
            "Kick",
          ],
        },
      ],
    },
  },
];
