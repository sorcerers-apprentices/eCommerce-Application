import type { JSX } from 'react'
import { CartRow } from '../CartRow/CartRow'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'
import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import Loader from '@/shared/ui/Loader/Loader'
import { CartMapper } from '../CartMapper'

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
