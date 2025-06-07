import s from './UserBar.module.scss'
import { NavLink } from 'react-router'
import type { ReactElement } from 'react'
import { MdFavoriteBorder } from 'react-icons/md'
import { UserButton } from '../UserButton/UserButton'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import CartCount from '@/components/Header/CartCount/CartCount'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

export const UserBar = (): ReactElement => {
  return (
    <nav className={s.navbar}>
      <NavLink to={RoutePath.MAIN} className={s.icon}>
        <MdFavoriteBorder className="icon" />
      </NavLink>
      <NavLink to={RoutePath.CART} className={s.icon}>
        <HiOutlineShoppingCart className="icon" />
        <CartCount />
      </NavLink>
      <UserButton />
    </nav>
  )
}
