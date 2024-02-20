import {
  useCallback,
  useEffect,
  HTMLAttributes,
  ReactNode,
  RefObject,
  useRef,
} from 'react'
import PrimaryButton from '../button/PrimaryButton'
import ArrowDownSvgIcon from '../svg/ArrowDownSvgIcon'
import Style from './DropdownSelect.module.scss'
import { useClickOutside } from '@/hooks/useOnClickOutside'

type DropdownProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  toggleLabel: string
  showMenu: boolean
  handleKeys?: (event: KeyboardEvent) => void
  toggleDropdown: () => void
}

const DropdownSelect = ({
  className,
  children,
  toggleLabel,
  showMenu,
  handleKeys,
  toggleDropdown,
}: DropdownProps) => {
  const dropdown = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    toggleDropdown()
  }

  useClickOutside([dropdown as RefObject<HTMLElement>], () => {
    if (!showMenu) return
    toggleDropdown()
  })

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!showMenu) return
      switch (e.code) {
        case 'Escape':
          toggleDropdown
          break
        default:
          handleKeys?.(e)
          break
      }
    },
    [handleKeys, toggleDropdown, showMenu]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, showMenu])

  return (
    <div className={`${Style['dropdown']} ${className}`} ref={dropdown}>
      <PrimaryButton
        type='button'
        aria-label='Toggle Dropdown'
        onClick={handleClick}
        className={Style['dropdown__toggle']}
      >
        {toggleLabel}
        <ArrowDownSvgIcon aria-hidden />
      </PrimaryButton>

      {showMenu && <ul className={Style['dropdown__items']}>{children}</ul>}
    </div>
  )
}

export default DropdownSelect
