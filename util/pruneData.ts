export default function pruneData (data: any[], names?: string, fields?: string) {
  const namesFilter = names ? names.split(',').map((t) => t.trim()) : names;
  return data
    .filter(({name}) => namesFilter ? namesFilter.includes(name) : true);
}