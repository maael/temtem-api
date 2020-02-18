export function traverseObject(
  obj: any,
  func: (value: any, key: string) => any
) {
  const clone = JSON.parse(JSON.stringify(obj));
  for (const i in clone) {
    clone[i] = func.apply(null, [clone[i], i]);
    if (clone[i] !== null && typeof clone[i] === "object") {
      traverseObject(clone[i], func);
    }
  }
  return clone;
}

export default function traverse(
  obj: any,
  func: (value: any, key: string) => any
) {
  return Array.isArray(obj)
    ? obj.map(o => traverseObject(o, func))
    : traverseObject(obj, func);
}

export function cleanStrings(s: any) {
  return typeof s === "string"
    ? s
        .replace(/\n/g, " ")
        .replace("„", "")
        .replace("~ In-Game Description", "")
        .replace(/\s\s+/g, " ")
        .trim()
    : s;
}
