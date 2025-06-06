import type { JSX } from 'react'
import { CartRow } from '../CartRow/CartRow'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'
import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import Loader from '@/shared/ui/Loader/Loader'
import { CartMapper } from '../cartMapper'

// const cartItemData = [
//   { id: '1', name: 'Product 1', image: '/images/cat-yellow-bg.jpeg', price: 100, quantity: 1, total: 100 },

//   { id: '2', name: 'Product 2', image: '/images/dog-green-bg.jpg', price: 200, quantity: 2, total: 400 },
// ]

export const CartTable = (): JSX.Element => {
  const { data, error, loading } = useFetch<ClientResponse<Cart>>(api.cart.fetchActiveCart)
  return (
    <>
      {loading && <Loader />}
      {error && <div>{error.message}</div>}
      {data && (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>
                <button>Clear all</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {CartMapper.toCartView(data.body).map((product) => (
              <CartRow key={product.id} cartItemData={product} productLink={RoutePath.MAIN} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
