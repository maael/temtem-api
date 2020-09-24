export default function pruneData(
  data: any[],
  names?: string,
  fields?: string,
  limit?: string
) {
  const namesFilter = names ? names.split(",").map(t => t.trim()) : undefined;
  const fieldsFilter = fields
    ? fields.split(",").map(t => t.trim())
    : undefined;
  const limitFilter =
    limit && !isNaN(Number(limit)) ? Number(limit) : undefined;
  return data
    .filter(({ name }) => (namesFilter ? namesFilter.includes(name) : true))
    .slice(0, limitFilter)
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
