import { Temtem } from "./embellishKnownTemtemSpecies";

export default function embellishTemtemEvolutionTraits(temtem: Temtem[]) {
  return temtem.map((t) => {
    if (t.evolution.evolves && t.evolution.evolutionTree) {
      t.evolution.evolutionTree = t.evolution.evolutionTree.map((e, i, ar) => {
        const first = temtem.find(({ name }) => name === e.name);
        const second =
          temtem.find(({ name }) => ar[i + 1] && name === ar[i + 1].name) ||
          first;
        if (!first || !second) return e;
        return {
          ...e,
          traitMapping: first.traits.reduce(
            (acc, trait, j) =>
              Object.assign(acc, {
                [trait]: (second && second.traits[j]) || "Unknown",
              }),
            {}
          ),
        };
      });
    }
    return t;
  });
}
