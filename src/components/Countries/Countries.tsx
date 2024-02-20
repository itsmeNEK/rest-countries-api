import PrimaryButton from '../common/button/PrimaryButton'
import DropdownSelect from '../common/form-control/DropdownSelect'
import Style from './Countries.module.scss'
import PaginateCountries from './PaginateCountries'
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
  const service = region || search ? (region ? 'region' : 'name') : 'all'
  const filter = region || search || ''
  const API_URL_FIELDS = '?fields=name,flags,population,region,capital,cca3'

  const countries =
    (await fetchCountries(service, API_URL_FIELDS, filter)) ?? []
  const regionFilterItem = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

  return (
    <div className='wrapper'>
      <div className={Style['filter']}>
        <SearchFilter />
        <DropdownSelect
          toggleLabel='Filter by Region'
          className={Style['filter__region']}
        >
          {regionFilterItem.map((item: string, index: number) => (
            <li className={Style['filter__region__items']} key={index}>
              <PrimaryButton
                type='button'
                aria-label={`${item} filter button`}
                className={Style['filter__region__items']}
              >
                {item}
              </PrimaryButton>
            </li>
          ))}
        </DropdownSelect>
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
