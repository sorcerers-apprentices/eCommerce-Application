import s from './UserBar.module.scss'
import { NavLink } from 'react-router'
import type { ReactElement } from 'react'
import { MdFavoriteBorder } from 'react-icons/md'
import { UserButton } from '../UserButton/UserButton'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { useCartContext } from '@/hooks/useCartContext'
import CartCounter from '@/components/Header/CartCount/CartCounter'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

export const UserBar = (): ReactElement => {
  const { state } = useCartContext()
  const countProducts = state.countProducts

  return (
    <nav className={s.navbar}>
      <NavLink to={RoutePath.MAIN} className={s.icon}>
        <MdFavoriteBorder className="icon" />
      </NavLink>
      <NavLink to={RoutePath.CART} className={s.icon}>
        <HiOutlineShoppingCart className="icon" />
        <CartCounter count={countProducts} />
      </NavLink>
      <UserButton />
    </nav>
  )
}
