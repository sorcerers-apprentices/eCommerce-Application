import s from './CartCount.module.scss'
import type { ReactElement } from 'react'

type CartCounterProps = {
  count: number | undefined
}

const CartCounter = ({ count }: CartCounterProps): ReactElement | null => {
  if (!count || count < 1) return null

  return (
    <div className={s.cartcount}>
      <p className={s.count}>{String(count)}</p>
    </div>
  )
}

export default CartCounter
