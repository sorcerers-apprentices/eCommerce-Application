import type { JSX } from 'react'
import s from './CartSection.module.scss'

export const CartSection = (): JSX.Element => {
  return (
    <div className={s.section}>
      <h2 className="title">Cart</h2>
    </div>
  )
}
