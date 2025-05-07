import type { ReactElement } from 'react'
import { NavigationBar } from './NavigationBar/NavigationBar'
import './Header.scss'
export const Header = (): ReactElement => {
  return (
    <header className="section header">
      <h1 className="title">
        <img className="logo" src="./logo.png" alt="logo" />
      </h1>
      <NavigationBar />
    </header>
  )
}
