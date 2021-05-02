import { Location } from "../checker/codecs/locations";
import { Temtem } from "../checker/codecs/temtem";
import calculateFreetemReward from "../../util/calculateFreetemReward";

function getName({ name }) {
  return name;
}

export default function embellishTemtemLocationPlacesAndNotes(
  temtem: Temtem[],
  locations: Location[]
) {
  const possiblePlaceNames = [
    ...new Set(
      locations.reduce<string[]>(
        (acc, { landmarks, townsAndVillages, routes }) => {
          return acc.concat(
            landmarks
              .map(getName)
              .concat(townsAndVillages.map(getName).concat(routes.map(getName)))
          );
        },
        []
      )
    ),
  ];
  return temtem.map((t) => ({
    ...t,
    locations: t.locations
      .map(extractPlace(possiblePlaceNames))
      .map(getFreetemInfo(t)),
  }));
}

function extractPlace(possiblePlaceNames: string[]) {
  return function (l: Temtem["locations"][0]) {
    const place = possiblePlaceNames.find((p) =>
      l.location.toLowerCase().startsWith(p.toLowerCase())
    );
    if (place) {
      l.place = place;
      l.note = l.location.replace(place, "").replace(", ", "").trim();
    }
    return l;
  };
}

function getFreetemInfo(t: Temtem) {
  return function (l: Temtem["locations"][0]) {
    const levelParts = l.level.split("-");
    const minLevel = parseInt(levelParts.slice(0, 1)[0], 10) || 0;
    const maxLevel = parseInt(levelParts.slice(-1)[0], 10) || 0;
    l.freetem = {
      minLevel,
      maxLevel,
      minPansuns: calculateFreetemReward(t.catchRate, minLevel) || 0,
      maxPansuns: calculateFreetemReward(t.catchRate, maxLevel) || 0,
    };
    return l;
  };
}
