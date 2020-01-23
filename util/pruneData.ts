export default function pruneData(
  data: any[],
  names?: string,
  fields?: string
) {
  const namesFilter = names ? names.split(",").map(t => t.trim()) : undefined;
  const fieldsFilter = fields
    ? fields.split(",").map(t => t.trim())
    : undefined;
  return data
    .filter(({ name }) => (namesFilter ? namesFilter.includes(name) : true))
    .map(pick(fieldsFilter));
}

function pick(keys?: string[]) {
  return (ob: any) =>
    keys
      ? keys.reduce(
          (pre, cur) =>
            ob.hasOwnProperty(cur) ? { ...pre, [cur]: ob[cur] } : pre,
          {}
        )
      : ob;
}
