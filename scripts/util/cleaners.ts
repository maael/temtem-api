export function cleanToNumber(input: number | string): number {
  return typeof input === "string" ? 0 : input;
}
