'use client'
import Link from 'next/link'
import Style from './DropdownFilter.module.scss'
import DropdownSelect from '@/components/common/form-control/DropdownSelect'

export default function DropdownFilter({
  searchParams,
}: {
  searchParams: {
    region: string
    search: string
  }
}) {
  const { region, search } = searchParams
  const regionItems = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

  return (
    <DropdownSelect
      toggleLabel='Filter by Region'
      className={Style['filter-region']}
    >
      <Link href={`?search=${search ? search : ''}&region=`}>
        <li
          className={`${Style['filter-region__items']} ${!region && Style['filter-region__items-selected']}`}
        >
          All
        </li>
      </Link>
      {regionItems.map((item: string, index: number) => (
        <Link
          key={index}
          href={`?search=${search ? search : ''}&region=${item}`}
        >
          <li
            className={`${Style['filter-region__items']} ${region === item && Style['filter-region__items-selected']}`}
          >
            {item}
          </li>
        </Link>
      ))}
    </DropdownSelect>
  )
}
