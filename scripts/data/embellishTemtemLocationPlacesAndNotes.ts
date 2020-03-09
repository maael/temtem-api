import { Location } from "../checker/codecs/locations";
import { Temtem } from "../checker/codecs/temtem";

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
    )
  ];
  return temtem.map(t => ({
    ...t,
    locations: t.locations.map(extractPlace(possiblePlaceNames))
  }));
}

function extractPlace(possiblePlaceNames: string[]) {
  return function(l: Temtem["locations"][0]) {
    const place = possiblePlaceNames.find(p =>
      l.location.toLowerCase().startsWith(p.toLowerCase())
    );
    if (place) {
      l.place = place;
      l.note = l.location
        .replace(place, "")
        .replace(", ", "")
        .trim();
    }
    return l;
  };
}
