/**
 * Allows typing Cheerio's toArray, and filters out any falsy entries
 */
export function typedToArray<T>(c: cheerio.Cheerio) {
  return (c.toArray().filter(Boolean) as unknown) as Array<T>;
}

export function isTagElement(el: cheerio.Element): el is cheerio.TagElement {
  return el.type === "tag";
}

export function isElementTagName(
  el: cheerio.Element | undefined,
  tagName: string,
  attr: string = "name"
) {
  return el && isTagElement(el) && el[attr] === tagName;
}

export function isElementTagNameNot(
  el: cheerio.Element | undefined,
  tagName: string,
  attr: string = "name"
) {
  return el && isTagElement(el) && el[attr] !== tagName;
}
