import { NavLink } from 'react-router'
import { type ReactElement } from 'react'
import s from './NavigationBar.module.scss'
import { useLocation } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

export const NavigationBar = (): ReactElement => {
  const location = useLocation()

  const isCurrentPage = (path: RoutePath): boolean => {
    return location.pathname === path
  }

  return (
    <nav className={s.navbar}>
      {!isCurrentPage(RoutePath.MAIN) && (
        <NavLink to={RoutePath.MAIN} className={s.link}>
          Main
        </NavLink>
      )}

      {!isCurrentPage(RoutePath.CATALOG) && (
        <NavLink to={RoutePath.CATALOG} className={s.link}>
          Catalog
        </NavLink>
      )}

      {!isCurrentPage(RoutePath.ABOUT) && (
        <NavLink to={RoutePath.ABOUT} className={s.link}>
          About
        </NavLink>
      )}
    </nav>
  )
}
