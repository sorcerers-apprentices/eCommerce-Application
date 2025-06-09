import type { JSX } from 'react'
import { CartRow } from '../CartRow/CartRow'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { useFetch } from '@/shared/hooks/useFetch'
import { api } from '@/server/api'
import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import Loader from '@/shared/ui/Loader/Loader'
import { CartMapper } from '../CartMapper'
import { useCart } from '@/hooks/useCart'
import s from '../CartSection.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { NavLink } from 'react-router-dom'

export const CartTable = (): JSX.Element => {
  const { data, error, loading, refetch } = useFetch<ClientResponse<Cart>>(api.cart.fetchActiveCart)
  const { clearCart } = useCart()
  return (
    <div className="section">
      {loading && <Loader />}
      {error && <div>{error.message}</div>}

      {data &&
        (data?.body.lineItems.length ? (
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
        ) : (
          <div className={s.empty}>
            <div>
              Your cart is empty.
              <br />
              Go away… and don’t come back without some goodies!
            </div>
            <NavLink to={RoutePath.CATALOG}>
              <Button>Go to catalog</Button>
            </NavLink>
          </div>
        ))}
    </div>
  )
}
