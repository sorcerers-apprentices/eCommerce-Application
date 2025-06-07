import s from './CartCount.module.scss'
import type { ReactElement } from 'react'

const CartCount = (): ReactElement => {
  return (
    <div className={s.cartcount}>
      <p className={s.count}>4</p>
    </div>
  )
}

export default CartCount
