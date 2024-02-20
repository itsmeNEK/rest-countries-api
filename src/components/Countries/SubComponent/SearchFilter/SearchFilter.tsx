'use client'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import Style from './SearchFilter.module.scss'
import SearchSvgIcon from '@/components/common/svg/SearchSvgIcon'

export default function SearchFilter() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`?search=${search}`)
  }

  return (
    <div className={Style['search']}>
      <form onSubmit={handleSubmit}>
        <input
          type='search'
          id='search-country-input'
          placeholder='Search for a country'
          className={Style['search__input']}
          value={search}
          onChange={handleSearchChange}
        />
        <SearchSvgIcon aria-hidden />
      </form>
    </div>
  )
}
