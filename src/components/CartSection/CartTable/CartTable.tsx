import type { JSX } from 'react'
import { CartRow } from '../CartRow/CartRow'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'
import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import Loader from '@/shared/ui/Loader/Loader'
import { CartMapper } from '../CartMapper'
import { useCart } from '@/hooks/useCart'

export const CartTable = (): JSX.Element => {
  const { data, error, loading, refetch } = useFetch<ClientResponse<Cart>>(api.cart.fetchActiveCart)
  const { clearCart } = useCart()
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
                <button
                  type="button"
                  onClick={async () => {
                    if (data?.body.id) {
                      await clearCart()
                      refetch()
                    }
                  }}
                >
                  Clear all
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {CartMapper.toCartView(data.body).map((product) => (
              <CartRow key={product.id} cartItemData={product} productLink={RoutePath.MAIN} refetch={refetch} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
