export default function expandFields (data: any, objectKey: string, matchingKey: string) {
  return (object: any) => {
    return {
      ...object,
      [objectKey]: object[objectKey].map((obItem) => data.find((item) => item[matchingKey] === obItem))
    }
  }
}