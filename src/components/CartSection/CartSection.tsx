import type { JSX } from 'react'
import s from './CartSection.module.scss'
import { CartTable } from './CartTable/CartTable'
import { Discount } from './Discount/Discount'

export const CartSection = (): JSX.Element => {
  return (
    <div className={s.section}>
      <h2 className="title">Cart</h2>
      <CartTable />
      <Discount />
    </div>
  )
}
