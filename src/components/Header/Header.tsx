import s from './Header.module.scss'
import type { ReactElement } from 'react'

import { Link } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { NavigationBar } from './NavigationBar/NavigationBar'
import { UserBar } from './UserBar/UserBar'

export const Header = (): ReactElement => {
  return (
    <header className={`section ${s.header}`}>
      <Link to={RoutePath.MAIN}>
        <img className={s.logo} src="./logo.png" alt="logo" />
      </Link>
      <NavigationBar />
      <UserBar />
    </header>
  )
}
