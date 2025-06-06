import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import type { TCartItem } from '@/types/user-types'
type TProperties = {
  productLink: string
  cartItemData: TCartItem
}

export const CartRow = ({ cartItemData, productLink }: TProperties): JSX.Element => {
  return (
    <tr>
      <td>
        <Link to={productLink}>{cartItemData.image}</Link>
        <Link to={productLink}>{cartItemData.name}</Link>
      </td>
      <td>{cartItemData.price}</td>
      <td>
        <button>+</button>
        <span>{cartItemData.quantity}</span>
        <button>-</button>
      </td>
      <td>{cartItemData.total}</td>
      <td>
        <button>
          <MdDeleteForever />
        </button>
      </td>
    </tr>
  )
}
