export function formatNullableValue(value: string | string[]): string {
  return value !== null && value !== undefined ? value.toString() : '-'
}
