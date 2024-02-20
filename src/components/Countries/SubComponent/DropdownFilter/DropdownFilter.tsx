'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Style from './DropdownFilter.module.scss'
import PrimaryButton from '@/components/common/button/PrimaryButton'
import DropdownSelect from '@/components/common/form-control/DropdownSelect'

const REGION_ITEMS = ['All', 'Africa', 'America', 'Asia', 'Europe', 'Oceania']
const DEFAULT_LABEL = 'Filter by Region'
export default function DropdownFilter() {
  const FOCUS_CLASS = Style['filter-region__items-focus']
  const SELECTED_CLASS = Style['filter-region__items-selected']
  const params = new URLSearchParams(useSearchParams())
  const { push } = useRouter()
  const region = params.get('region')
  const [selectedItem, setSelectedItem] = useState<number>(
    region ? REGION_ITEMS.indexOf(region) : 0
  )
  const [showMenu, setShowMenu] = useState(false)

  const toggleDropdown = () => {
    setShowMenu((prevVal) => !prevVal)
  }
  const setParams = (val: string) => {
    val === 'All' ? params.delete('region') : params.set('region', val)
    push(`?${params.toString()}`)
  }
  const onSelect = () => {
    setParams(REGION_ITEMS[selectedItem])
    toggleDropdown()
  }
  const handleClick = (item: string) => () => {
    setSelectedItem(REGION_ITEMS.indexOf(item))
    setParams(item)
    toggleDropdown()
  }

  const handleKeys = (e: KeyboardEvent) => {
    switch (e.code) {
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
      case 'Space':
        e.preventDefault()
        onSelect()
        break
      default:
        break
    }
  }

  return (
    <DropdownSelect
      showMenu={showMenu}
      toggleDropdown={toggleDropdown}
      handleKeys={handleKeys}
      toggleLabel={selectedItem !== 0 && region ? region : DEFAULT_LABEL}
      className={Style['filter-region']}
    >
      {REGION_ITEMS.map((item: string, index: number) => (
        <PrimaryButton
          key={index}
          onClick={handleClick(item)}
          className={`${Style['filter-region__items']} ${region === item || (!region && item === 'All') ? SELECTED_CLASS : ''} ${selectedItem === index ? FOCUS_CLASS : ''}`}
        >
          <li>{item}</li>
        </PrimaryButton>
      ))}
    </DropdownSelect>
  )
}
