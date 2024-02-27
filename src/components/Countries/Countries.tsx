import Style from './Countries.module.scss'
import PaginateCountries from './PaginateCountries'
import DropdownFilter from './SubComponent/DropdownFilter/DropdownFilter'
import SearchFilter from './SubComponent/SearchFilter/SearchFilter'
import { searchParamsTypes } from '@/types/searchParamsTypes'
import fetchCountries from '@/utils/fetchCountries'

const API_URL_FIELDS = '?fields=name,flags,population,region,capital,cca3'
export default async function Countries({ searchParams }: searchParamsTypes) {
  const { region, search } = searchParams

  const searchType = region ? 'region' : 'name'
  const service = region || search ? searchType : 'all'

  const filter = region || search || ''
  const countries =
    (await fetchCountries(service, API_URL_FIELDS, filter, search)) ?? []

  return (
    <section className='wrapper'>
      <div className={Style['filter']}>
        <SearchFilter />
        <DropdownFilter />
      </div>
      <div className={Style['countries']}>
        {countries.length > 0 ? (
          <PaginateCountries data={countries} />
        ) : (
          <div>No countries found</div>
        )}
      </div>
    </section>
  )
}
