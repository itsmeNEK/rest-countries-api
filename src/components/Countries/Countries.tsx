import Style from './Countries.module.scss'
import PaginateCountries from './PaginateCountries'
import DropdownFilter from './SubComponent/DropdownFilter/DropdownFilter'
import SearchFilter from './SubComponent/SearchFilter/SearchFilter'
import fetchCountries from '@/utils/fetchCountries'

export default async function Countries({
  searchParams,
}: {
  searchParams: {
    region: string
    search: string
  }
}) {
  const { region, search } = searchParams

  const searchType = region ? 'region' : 'name'
  const service = region || search ? searchType : 'all'

  const filter = region || search || ''
  const API_URL_FIELDS = '?fields=name,flags,population,region,capital,cca3'
  const countries =
    (await fetchCountries(service, API_URL_FIELDS, filter, search)) ?? []

  return (
    <div className='wrapper'>
      <div className={Style['filter']}>
        <SearchFilter searchParams={searchParams} />
        <DropdownFilter searchParams={searchParams} />
      </div>
      <div className={Style['countries']}>
        {countries.length > 0 ? (
          <PaginateCountries data={countries} />
        ) : (
          <div>No countries found</div>
        )}
      </div>
    </div>
  )
}
