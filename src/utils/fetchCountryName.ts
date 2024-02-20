import { CountryTypes } from '@/types/countryTypes'

export default async function fetchCountryNames(
  countryCodes: string[]
): Promise<{ name: string; code: string }[]> {
  const countries: { name: string; code: string }[] = []
  if (!countryCodes) return []

  for (const code of countryCodes) {
    const data = await fetchCountryName(code)
    if (data) {
      countries.push({ name: data.name.common, code: data.cca3 })
    }
  }

  return countries
}

async function fetchCountryName(
  code: string
): Promise<CountryTypes | undefined> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}?fields=name,cca3`
    )
    if (!response.ok) {
      console.error(`Failed to fetch country name for code ${code}`)
      return
    }
    const data = await response.json()
    return data
  } catch (error: unknown) {
    console.error(`Error fetching country name for code ${code}:`, error)
    return
  }
}
