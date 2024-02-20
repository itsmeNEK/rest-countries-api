import { CountryTypes } from '@/types/countryTypes'

export default async function fetchCountries(
  service: string | string[],
  fields: string,
  filter?: string
) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/${service}${filter ? '/' + filter : ''}?${fields}`
    )
    if (!response.ok) {
      return
    }
    const data = await response.json()
    if (service === 'alpha') {
      return data
    }
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
  } catch (error: unknown) {
    console.error('Error fetching countries:', error)
  }
}
