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
        {cartItemData.price * cartItemData.quantity === cartItemData.total ? (
          <div>{`${cartItemData.total / cartItemData.quantity} €`}</div>
        ) : (
          <>
            <div className={s.price}>{`${cartItemData.price} €`}</div>
            <div>{`${cartItemData.total / cartItemData.quantity} €`}</div>
          </>
        )}
      </td>
      <td>
        <div>
          <div
            className={s.link}
            onClick={async () => {
              await decrementProductInCart(cartItemData.id)
              refetch()
            }}
          >
            -
          </div>
          <span>{cartItemData.quantity}</span>
          <div
            className={s.link}
            onClick={async () => {
              await addProductToCart(cartItemData.id, 1)
              refetch()
            }}
          >
            +
          </div>
        </div>
      </td>
      <td className={s.td}>
        {cartItemData.price * cartItemData.quantity === cartItemData.total ? (
          <div>{`${cartItemData.total} €`}</div>
        ) : (
          <>
            <div className={s.price}>{`${cartItemData.price * cartItemData.quantity} €`}</div>
            <div>{`${cartItemData.total} €`}</div>
          </>
        )}
      </td>
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
