'use client'
import Style from './ToggleDarkMode.module.scss'
import PrimaryButton from '@/components/common/button/PrimaryButton'
import MoonSvgIcon from '@/components/common/svg/MoonSvgIcon'
import { useThemeContext } from '@/context/themeContext'

export default function ToggleDarkMode() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <PrimaryButton
      onClick={toggleTheme}
      className={Style['dark-mode-button']}
      type='button'
      aria-label='Dark Mode Button'
    >
      <MoonSvgIcon aria-hidden />
      {theme === 'dark' ? 'Dark' : 'Light'} Mode
    </PrimaryButton>
  )
}
