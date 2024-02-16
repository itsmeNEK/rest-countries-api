'use client'
import { ReactNode, useRef, useState } from 'react'
import Style from './DropdownSelect.module.scss'
import { useClickOutside } from '@/hooks/useOnClickOutside'

type DropdownProps = {
  className?: string
  children?: ReactNode
  toggleLabel: string
}

const DropdownSelect = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdown = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen((prevVal) => !prevVal)
  }
  useClickOutside([dropdown], () => {
    if (isOpen) {
      setIsOpen(false)
    }
  })

  return (
    <div className={`${Style.dropdown} ${props.className}`} ref={dropdown}>
      <button
        type='button'
        aria-label='Toggle Dropdown'
        onClick={toggleDropdown}
        className={Style.dropdown__toggle}
      >
        {props.toggleLabel}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          width={13}
          height={13}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m19.5 8.25-7.5 7.5-7.5-7.5'
          />
        </svg>
      </button>

      {isOpen && <ul className={Style.dropdown__items}>{props.children}</ul>}
    </div>
  )
}

export default DropdownSelect
