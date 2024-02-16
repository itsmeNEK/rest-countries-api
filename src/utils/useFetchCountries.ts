import { CountryTypes } from '@/types/countryTypes'

export default async function useFetchCountries(
  service: string | string[],
  fields: string,
  params?: string | string[]
) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/${service}${params ? '?' + params + '&' : '?'}${fields}`
    )
    if (!response.ok) {
      return
    }
    const data = await response.json()
    data.sort((a: CountryTypes, b: CountryTypes) => {
      const nameA = a.name.common.toLowerCase()
      const nameB = b.name.common.toLowerCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
    return data
  } catch (error) {
    console.error('Error fetching countries:', error)
  }
}
