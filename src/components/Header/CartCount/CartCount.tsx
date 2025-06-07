import s from './CartCount.module.scss'
import type { ReactElement } from 'react'
import { useCartContext } from '@/hooks/useCartContext'

const CartCount = (): ReactElement | void => {
  const { state } = useCartContext()
  if (!state.countProducts || state.countProducts < 1) return
  const countProducts = String(state.countProducts)

  return (
    <div className={s.cartcount}>
      <p className={s.count}>{countProducts}</p>
    </div>
  )
}

export default CartCount
