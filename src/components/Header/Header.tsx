'use client'
import React, { useState } from 'react'
import PrimaryButton from '../common/button/PrimaryButton'
import MoonSvgIcon from '../common/svg/MoonSvgIcon'
import Style from './Header.module.scss'

export default function Header() {
  const [theme, setTheme] = useState(false)

  const handleThemeChange = () => {
    setTheme(!theme)
  }
  return (
    <nav className={Style['header']}>
      <div className={`wrapper ${Style['wrapper']}`}>
        <h1 className={Style['header__brand']}>Where in the world?</h1>
        <PrimaryButton
          className={Style['header__button']}
          type='button'
          aria-label='Dark Mode Button'
          onClick={handleThemeChange}
        >
          <MoonSvgIcon />
          {theme ? 'Dark' : 'Light'} Mode
        </PrimaryButton>
      </div>
    </nav>
  )
}
