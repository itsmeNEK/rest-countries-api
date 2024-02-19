// The function takes an object (data) containing key-value pairs, where the values can be either strings or nested objects. Optionally, it also accepts a fieldName parameter, which specifies a field name to extract from nested objects if present.

type renderObjectValuesTypes = {
  data: Record<string, string | { [key: string]: string }>
  fieldName?: string
}

export default function renderObjectValues({
  data,
  fieldName,
}: renderObjectValuesTypes) {
  const values: string[] = []

  for (const key in data) {
    const value = data[key]
    if (typeof value === 'object' && fieldName && fieldName in value) {
      values.push(`${value[fieldName]}`)
    } else {
      values.push(`${value}`)
    }
  }

  return <>{values.join(', ')}</>
}
