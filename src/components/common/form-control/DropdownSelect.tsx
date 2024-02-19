'use client'
import { ReactNode, useRef, useState } from 'react'
import ArrowDownSvgIcon from '../svg/ArrowDownSvgIcon'
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
    <div className={`${Style['dropdown']} ${props.className}`} ref={dropdown}>
      <button
        type='button'
        aria-label='Toggle Dropdown'
        onClick={toggleDropdown}
        className={Style['dropdown__toggle']}
      >
        {props.toggleLabel}
        <ArrowDownSvgIcon aria-hidden />
      </button>

      {isOpen && <ul className={Style['dropdown__items']}>{props.children}</ul>}
    </div>
  )
}

export default DropdownSelect
