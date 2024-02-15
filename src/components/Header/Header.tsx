'use client'
import PrimaryButton from '../common/button/PrimaryButton'
import MoonSvgIcon from '../common/svg/MoonSvgIcon'
import Style from './Header.module.scss'
import { useThemeContext } from '@/context/themeContext'

export default function Header() {
  const { theme, toggleTheme } = useThemeContext()

  const handleThemeChange = () => {
    toggleTheme()
  }
  return (
    <nav className={Style['header']}>
      <div className={`wrapper ${Style['wrapper']}`}>
        <h1 className={Style['header__brand']}>Where in the world?</h1>
        <PrimaryButton
          className={Style['header__button']}
          type='button'
          aria-label='Toggle Dark Mode'
          onClick={handleThemeChange}
        >
          <MoonSvgIcon aria-hidden />
          {theme === 'dark' ? 'Dark' : 'Light'} Mode
        </PrimaryButton>
      </div>
    </nav>
  )
}
