import { type JSX } from 'react'
import { Link } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import type { TCartItem } from '@/types/user-types'
import s from '../CartSection.module.scss'
import { useCart } from '@/hooks/useCart'

type TProperties = {
  productLink: string
  cartItemData: TCartItem
  refetch: () => void
}

export const CartRow = ({ cartItemData, productLink, refetch }: TProperties): JSX.Element => {
  const { addProductToCart, decrementProductInCart, removeProductFromCart } = useCart()

  return (
    <tr>
      <td>
        <Link to={productLink} className={s.image}>
          <img src={cartItemData.image} alt={cartItemData.name} />
        </Link>
        <Link to={productLink}>{cartItemData.name}</Link>
      </td>
      <td>{cartItemData.price}</td>
      <td>
        <button
          type="button"
          onClick={async () => {
            await addProductToCart(cartItemData.id, 1)
            refetch()
          }}
        >
          +
        </button>
        <span>{cartItemData.quantity}</span>
        <button
          type="button"
          onClick={async () => {
            await decrementProductInCart(cartItemData.id)
            refetch()
          }}
        >
          -
        </button>
      </td>
      <td>{cartItemData.total}</td>
      <td>
        <button
          type="button"
          onClick={async () => {
            await removeProductFromCart(cartItemData.id)
            refetch()
          }}
        >
          <MdDeleteForever />
        </button>
      </td>
    </tr>
  )
}
