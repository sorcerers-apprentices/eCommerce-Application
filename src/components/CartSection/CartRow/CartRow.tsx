import { type JSX } from 'react'
import { Link } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import type { TCartItem } from '@/types/user-types'
import s from '../CartSection.module.scss'
import { useCart } from '@/hooks/useCart'

type TProperties = {
  cartItemData: TCartItem
  refetch: () => void
}

export const CartRow = ({ cartItemData, refetch }: TProperties): JSX.Element => {
  const { addProductToCart, decrementProductInCart, removeProductFromCart } = useCart()

  return (
    <tr>
      <td>
        <div>
          <Link to={`/product/${cartItemData.id}`} className={s.image}>
            <img src={cartItemData.image} alt={cartItemData.name} />
          </Link>
          <Link to={`/product/${cartItemData.id}`}>{cartItemData.name}</Link>
        </div>
      </td>
      <td>
        <div>{`${cartItemData.price} €`}</div>
      </td>
      <td>
        <div>
          <div
            className={s.link}
            onClick={async () => {
              await addProductToCart(cartItemData.id, 1)
              refetch()
            }}
          >
            +
          </div>
          <span>{cartItemData.quantity}</span>
          <div
            className={s.link}
            onClick={async () => {
              await decrementProductInCart(cartItemData.id)
              refetch()
            }}
          >
            -
          </div>
        </div>
      </td>
      <td className={s.td}>{`${cartItemData.total} €`}</td>
      <td className={s.td}>
        <div
          className={s.link}
          onClick={async () => {
            await removeProductFromCart(cartItemData.id)
            refetch()
          }}
        >
          <MdDeleteForever />
        </div>
      </td>
    </tr>
  )
}
