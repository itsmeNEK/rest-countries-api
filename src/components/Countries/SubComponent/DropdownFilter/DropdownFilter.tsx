'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Style from './DropdownFilter.module.scss'
import DropdownSelect from '@/components/common/form-control/DropdownSelect'
import { searchParamsTypes } from '@/types/searchParamsTypes'

const REGION_ITEMS = ['All', 'Africa', 'America', 'Asia', 'Europe', 'Oceania']
const DEFAULT_LABEL = 'Filter by Region'
const FOCUS_CLASS = Style['filter-region__items-focus']
const SELECTED_CLASS = Style['filter-region__items-selected']
export default function DropdownFilter({ searchParams }: searchParamsTypes) {
  const router = useRouter()
  const { region, search } = searchParams
  const [selectedItem, setSelectedItem] = useState<number>(
    region ? REGION_ITEMS.indexOf(region) : 0
  )

  const onSelect = () => {
    if (selectedItem === 0) {
      router.replace(`${search ? '?search=' + search : '/'}`)
      return
    }
    router.replace(
      `${search ? '?search=' + search + '&' : '?'}region=${REGION_ITEMS[selectedItem]}`
    )
  }

  const handleKeys = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        setSelectedItem((prevIndex) =>
          prevIndex !== null ? Math.max(prevIndex - 1, 0) : 0
        )
        break
      case 'ArrowDown':
        e.preventDefault()
        setSelectedItem((prevIndex) =>
          prevIndex !== null
            ? Math.min(prevIndex + 1, REGION_ITEMS.length - 1)
            : 0
        )
        break
      case 'Enter':
        e.preventDefault()
        onSelect()
        break
      default:
        break
    }
  }

  return (
    <DropdownSelect
      handleKeys={handleKeys}
      toggleLabel={selectedItem !== 0 && region ? region : DEFAULT_LABEL}
      className={Style['filter-region']}
    >
      {REGION_ITEMS.map((item: string, index: number) => (
        <Link
          key={index}
          href={`${search ? '?search=' + search + '&' : '?'}${index !== 0 ? 'region=' + item : ''}`}
        >
          <li
            className={`${Style['filter-region__items']} ${region === item || (!region && item === 'All') ? SELECTED_CLASS : ''} ${selectedItem === index ? FOCUS_CLASS : ''}`}
          >
            {item}
          </li>
        </Link>
      ))}
    </DropdownSelect>
  )
}
