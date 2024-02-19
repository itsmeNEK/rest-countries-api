import PrimaryButton from '../common/button/PrimaryButton'
import DropdownSelect from '../common/form-control/DropdownSelect'
import SearchSvgIcon from '../common/svg/SearchSvgIcon'
import Style from './Countries.module.scss'
import PaginateCountries from './PaginateCountries'
import useFetchCountries from '@/utils/useFetchCountries'

export default async function Countries() {
  const API_URL_FIELDS = '?fields=name,flags,population,region,capital,cca3'

  const countries = (await useFetchCountries('all', API_URL_FIELDS)) ?? []
  const region = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']
  return (
    <div className='wrapper'>
      <div className={Style['filter']}>
        <div className={Style['filter__search']}>
          <input
            type='text'
            id='search-country-input'
            placeholder='Search for a country'
            className={Style['filter__search__input']}
          />
          <SearchSvgIcon aria-hidden />
        </div>
        <DropdownSelect
          toggleLabel='Filter by Region'
          className={Style['filter__region']}
        >
          {region.map((item: string, index: number) => (
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
