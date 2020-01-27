export default function expandFields(
  data: any,
  objectKey: string,
  matchingKey: string,
  subKey?: string
) {
  return (object: any) => {
    if (!object[objectKey]) return object;
    return {
      ...object,
      [objectKey]: object[objectKey].map(obItem => ({
        ...data.find(
          item => item[matchingKey] === (subKey ? obItem[subKey] : obItem)
        ),
        ...(subKey ? obItem : {})
      }))
    };
  };
}
