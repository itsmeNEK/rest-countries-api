import Link from 'next/link'
import Style from './Header.module.scss'
import ToggleDarkMode from './SubComponents/ToggleDarkMode'

export default function Header() {
  return (
    <nav className={Style['header']}>
      <div className={`wrapper ${Style['wrapper']}`}>
        <Link href='/'>
          <h1 className={Style['header__brand']}>Where in the world?</h1>
        </Link>
        <ToggleDarkMode />
      </div>
    </nav>
  )
}
