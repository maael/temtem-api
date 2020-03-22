import url from "url";

export function stripQuerystring(s: string = "") {
  if (!s) return s;
  const imageParts = url.parse(s || "");
  return `${imageParts.protocol}//${imageParts.host}${imageParts.pathname}`;
}
