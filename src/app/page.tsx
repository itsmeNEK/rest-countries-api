import CountryCard from '@/components/CountryCard/CountryCard'
import { CountryTypes } from '@/types/countryTypes'

export default function Home() {
  const country: CountryTypes = {
    name: 'Afghanistan',
    alpha3Code: 'AFG',
    capital: 'Kabul',
    region: 'Asia',
    population: 40218234,
    flags: {
      svg: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg',
      png: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png',
    },
  }
  return (
    <main>
      <CountryCard country={country} />
    </main>
  )
}
