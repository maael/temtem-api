import { Temtem } from "../scripts/checker/codecs/temtem";
import { TYPES } from "./constants";

const weaknessesData = require("../data/weaknesses.json");

export default function calculateWeaknesses(
  defending: string[],
  attacking?: string
) {
  if (
    attacking &&
    attacking.length &&
    TYPES.includes(attacking) &&
    defending.length &&
    defending.every(d => TYPES.includes(d))
  ) {
    const attackingRow = weaknessesData[attacking];
    const defendingModifiers = defending.map(d => attackingRow[d]);
    return {
      attacking,
      defending,
      modifiers: defendingModifiers,
      result: defendingModifiers.reduce((pre, cur) => pre * cur, 1)
    };
  } else {
    throw Error("An unknown type is present");
  }
}

export function addWeaknesses(temtem: Temtem, include?: boolean) {
  if (!include) return temtem;
  const weaknesses = TYPES.reduce((acc, t) => {
    let result = 1;
    try {
      const calculated = calculateWeaknesses(temtem.types, t);
      result = calculated.result;
    } catch {
      // Do nothing
    }
    return { ...acc, [t]: result };
  }, {});
  return { ...temtem, weaknesses };
}
