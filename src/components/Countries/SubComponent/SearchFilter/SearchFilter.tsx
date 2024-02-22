'use client'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import Style from './SearchFilter.module.scss'
import SearchSvgIcon from '@/components/common/svg/SearchSvgIcon'
import { searchParamsTypes } from '@/types/searchParamsTypes'

export default function SearchFilter({ searchParams }: searchParamsTypes) {
  const { region, search } = searchParams
  const router = useRouter()
  const [searchInput, setSearchInput] = useState(search)
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.replace(`?search=${searchInput}&region=${region ? region : ''}`)
  }

  return (
    <div className={Style['search']}>
      <form onSubmit={handleSubmit}>
        <input
          type='search'
          id='search-country-input'
          placeholder='Search for a country'
          className={Style['search__input']}
          value={searchInput}
          onChange={handleSearchChange}
        />
        <SearchSvgIcon aria-hidden />
      </form>
    </div>
  )
}
