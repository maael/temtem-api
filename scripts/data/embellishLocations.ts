export default function embellishLocations(locations, temtem) {
  return locations.map((l) => {
    if (l.type === "island") {
      l.temtem = [
        ...new Set(
          l.temtem
            .concat(
              temtem.filter((t) =>
                t.locations.some((tl) => tl.island === l.name)
              )
            )
            .map((t) => t.name)
            .filter(Boolean)
        ),
      ];
    }
    return l;
  });
}
