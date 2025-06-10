import { useState, type JSX } from 'react'
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
import { Modal } from '@/shared/ui/Modal/Modal'

export const CartTable = (): JSX.Element => {
  const { data, error, loading, refetch } = useFetch<ClientResponse<Cart>>(api.cart.fetchActiveCart)
  const { clearCart, applyDiscountCode } = useCart()
  const [modal, setModal] = useState(false)
  const clearAllAndClose = async (): Promise<void> => {
    if (data?.body.id) {
      await clearCart()
      refetch()
      setModal(false)
    }
  }
  return (
    <div className="section">
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <div className="section">
          <h2>Are you sure you want to clear your cart?</h2>
          <p>Your pets will be heartbroken without their surprise treats.</p>
          <div className={s.buttons}>
            <Button onClick={() => setModal(false)}>Cancel</Button>
            <Button onClick={clearAllAndClose}>Clear All</Button>
          </div>
        </div>
      </Modal>
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
                  <Button
                    type="button"
                    onClick={() => {
                      setModal(true)
                    }}
                  >
                    Clear all
                  </Button>
                  <Button type="button" onClick={async () => await applyDiscountCode('Reviewer20')}>
                    Apply promo code
                  </Button>
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
