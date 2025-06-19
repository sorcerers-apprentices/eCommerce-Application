import { useState, type JSX, type FormEvent, type ChangeEvent, useEffect } from 'react'
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
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent.tsx'
import { Form } from '@/shared/ui/Form/Form.tsx'
import { FormButton } from '@/components/LoginForm/FormButton.tsx'
import { toast } from 'react-hot-toast'
import type { TCartItem } from '@/types/user-types.ts'
import { MdDeleteForever } from 'react-icons/md'
import { calculatePrices, findPromoCodes } from '@/shared/utilities/commerceTools-utilities.ts'

export const CartTable = (): JSX.Element => {
  const { data, error, loading, refetch } = useFetch<ClientResponse<Cart>>(api.cart.fetchActiveCart)
  const { clearCart, applyDiscountCode } = useCart()
  const [modal, setModal] = useState(false)
  const [formData, setFormData] = useState({ promo: { value: '' } })

  const [priceData, setPriceData] = useState(calculatePrices(data?.body))
  const [promoCodes, setPromoCodes] = useState(findPromoCodes(data?.body))
  const [viewData, setViewData] = useState<TCartItem[]>([])

  useEffect(() => {
    if (!data?.body) return

    setPriceData(calculatePrices(data.body))
    setPromoCodes(findPromoCodes(data?.body))
    setViewData(CartMapper.toCartView(data.body))
  }, [data])

  const clearAllAndClose = async (): Promise<void> => {
    if (data?.body.id) {
      await clearCart()
      refetch()
      setModal(false)
    }
  }

  const onSubmitPromoCode = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const cart = await applyDiscountCode(formData.promo.value)
    if (cart) {
      setPriceData(calculatePrices(cart.body))
      setPromoCodes(findPromoCodes(cart.body))
      setViewData(CartMapper.toCartView(cart.body))
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setFormData((previous) => ({ ...previous, promo: { value } }))
  }

  const removePromoCode = async (promoCodeId: string): Promise<void> => {
    if (!data?.body.id) {
      return
    }
    try {
      const cart = await api.cart.removeDiscountCode(data.body.id, promoCodeId)
      if (cart) {
        setPriceData(calculatePrices(cart.body))
        setPromoCodes(findPromoCodes(cart.body))
        setViewData(CartMapper.toCartView(cart.body))
      }
    } catch {
      toast.error('Could not remove promo code')
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
          <div className={s.section}>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>
                    <div
                      className={s.clear}
                      onClick={() => {
                        setModal(true)
                      }}
                    >
                      Clear all
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {viewData.map((product) => (
                  <CartRow key={product.id} cartItemData={product} refetch={refetch} />
                ))}
              </tbody>
            </table>

            <div className={s.total}>
              <div className={s.row}>
                <div>Price before discount:</div>
                <div>{priceData.initialPrice} €</div>
              </div>
              <Form className={['form', 'section']} onSubmit={onSubmitPromoCode}>
                <InputComponent
                  value={formData.promo.value}
                  name={'promo'}
                  title={'Apply promo code'}
                  type={'text'}
                  placeholder={'Enter promo code'}
                  onChange={handleChange}
                />
                <FormButton value={'Apply promo code'} disabled={false} />
              </Form>
              {promoCodes.map((code) => (
                <div key={code.id} className={s.promocode}>
                  <p>{code.name?.toString() || 'Loading…'}</p>
                  <div className={s.link} onClick={async () => await removePromoCode(code.id.toString())}>
                    <MdDeleteForever />
                  </div>
                </div>
              ))}
              <div className={s.row}>
                <div>Discount:</div>
                <div>{priceData.discountPrice} €</div>
              </div>
              <div className={s.row}>
                <div className="title">Price:</div>
                <div className="title">{priceData.totalPrice} €</div>
              </div>
            </div>
          </div>
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
