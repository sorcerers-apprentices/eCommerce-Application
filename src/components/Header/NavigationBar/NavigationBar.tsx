import { NavLink } from 'react-router'
import type { ReactElement } from 'react'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import s from './NavigationBar.module.scss'

export const NavigationBar = (): ReactElement => {
  return (
    <nav className={s.navbar}>
      <NavLink to={RoutePath.MAIN} className={s.link}>
        Main
      </NavLink>
      <NavLink to={RoutePath.CATALOG} className={s.link}>
        Catalog
      </NavLink>
      <NavLink to={RoutePath.ABOUT} className={s.link}>
        About
      </NavLink>
    </nav>
  )
}
