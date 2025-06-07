import { NavLink } from 'react-router'
import type { ReactElement } from 'react'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { UserButton } from '../UserButton/UserButton'

import { MdFavoriteBorder } from 'react-icons/md'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import s from './UserBar.module.scss'

export const UserBar = (): ReactElement => {
  return (
    <nav className={s.navbar}>
      <NavLink to={RoutePath.MAIN} className={s.icon}>
        <MdFavoriteBorder className="icon" />
      </NavLink>
      <NavLink to={RoutePath.CART} className={s.icon}>
        <HiOutlineShoppingCart className="icon" />
      </NavLink>
      <UserButton />
    </nav>
  )
}
