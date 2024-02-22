'use client'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import ArrowDownSvgIcon from '../svg/ArrowDownSvgIcon'
import Style from './DropdownSelect.module.scss'
import { useClickOutside } from '@/hooks/useOnClickOutside'

type DropdownProps = {
  className?: string
  children?: ReactNode
  toggleLabel: string
  handleKeys?: (event: KeyboardEvent) => void
  onSelect?: () => void
}

const DropdownSelect = ({
  className,
  children,
  toggleLabel,
  handleKeys,
}: DropdownProps) => {
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
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      switch (e.key) {
        case 'Escape':
          setIsOpen((prevVal) => !prevVal)
          break
        case 'Enter':
          handleKeys?.(e)
          setIsOpen((prevVal) => !prevVal)
          break
        default:
          handleKeys?.(e)
          break
      }
    },
    [handleKeys, isOpen]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
  return (
    <div className={`${Style['dropdown']} ${className}`} ref={dropdown}>
      <button
        type='button'
        aria-label='Toggle Dropdown'
        onClick={toggleDropdown}
        className={Style['dropdown__toggle']}
      >
        {toggleLabel}
        <ArrowDownSvgIcon aria-hidden />
      </button>

      {isOpen && <ul className={Style['dropdown__items']}>{children}</ul>}
    </div>
  )
}

export default DropdownSelect
