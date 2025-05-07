import type { ReactElement } from 'react'
import { NavigationBar } from './NavigationBar/NavigationBar'
import s from './Header.module.scss'
export const Header = (): ReactElement => {
  return (
    <header className={`section ${s.header}`}>
      <h1 className={s.title}>
        <img className="logo" src="./logo.png" alt="logo" />
      </h1>
      <NavigationBar />
    </header>
  )
}
