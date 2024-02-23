'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'
import Style from './SearchFilter.module.scss'
import SearchSvgIcon from '@/components/common/svg/SearchSvgIcon'
import useDebounce from '@/hooks/useDebounce'

export default function SearchFilter() {
  const params = new URLSearchParams(useSearchParams())
  const { replace } = useRouter()
  const handleSearchChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value
    searchValue ? params.set('search', searchValue) : params.delete('search')
    replace(`?${params.toString()}`)
  }, 500)

  return (
    <div className={Style['search']}>
      <input
        type='search'
        id='search-country-input'
        placeholder='Search for a country'
        className={Style['search__input']}
        defaultValue={params.get('search') || ''}
        onChange={handleSearchChange}
      />
      <SearchSvgIcon aria-hidden />
    </div>
  )
}
