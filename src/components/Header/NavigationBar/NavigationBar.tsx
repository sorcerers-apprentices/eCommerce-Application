import { NavLink } from 'react-router'
import type { ReactElement } from 'react'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import s from './NavigationBar.module.scss'
export const NavigationBar = (): ReactElement => {
  return (
    <nav className={s.navbar}>
      <NavLink to={RoutePath.MAIN}>Main</NavLink>
      <NavLink to={RoutePath.LOGIN}>Login</NavLink>
      <NavLink to={RoutePath.REGISTRATION}>Registration</NavLink>
      <NavLink to={RoutePath.PROFILE}>Profile</NavLink>
    </nav>
  )
}
