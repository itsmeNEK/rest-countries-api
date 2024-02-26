'use client'
import Style from './ToggleDarkMode.module.scss'
import PrimaryButton from '@/components/common/button/PrimaryButton'
import MoonSvgIcon from '@/components/common/svg/MoonSvgIcon'
import SunSvgIcon from '@/components/common/svg/SunSvgIcon'
import { useThemeContext } from '@/context/themeContext'

export default function ToggleDarkMode() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <PrimaryButton
      onClick={toggleTheme}
      className={Style['dark-mode-button']}
      type='button'
    >
      {theme === 'dark' ? (
        <>
          <MoonSvgIcon aria-hidden />
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <SunSvgIcon aria-hidden />
          <span>Light Mode</span>
        </>
      )}
    </PrimaryButton>
  )
}
