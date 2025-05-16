import s from './Header.module.scss'
import type { ReactElement } from 'react'

import { Link } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { NavigationBar } from './NavigationBar/NavigationBar'
import { UserBar } from './UserBar/UserBar'

export const Header = (): ReactElement => {
  return (
    <header className={`section ${s.header}`}>
      <Link to={RoutePath.MAIN} className={s.wrapper}>
        <img className={s.logo} src="./logo.png" alt="logo" />
        <div className={s.magic}>ВЖУХ!</div>
      </Link>
      <NavigationBar />
      <UserBar />
    </header>
  )
}
