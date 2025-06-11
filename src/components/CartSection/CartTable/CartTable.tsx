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
import { CENTS_IN_DOLLAR, DECIMAL_PLACES } from '@/shared/utilities/price.ts'

type PriceData = {
  initialPrice: number
  discountPrice: number
  totalPrice: number
}

type Code = {
  name: string | undefined
  id: string
}

export const CartTable = (): JSX.Element => {
  const { data, error, loading, refetch } = useFetch<ClientResponse<Cart>>(api.cart.fetchActiveCart)
  const { clearCart, applyDiscountCode } = useCart()
  const [modal, setModal] = useState(false)
  const [formData, setFormData] = useState({ promo: { value: '' } })

  const calculatePrices = (data?: Cart): PriceData => {
    if (!data) {
      return { initialPrice: 0, discountPrice: 0, totalPrice: 0 }
    }

    const discountPrice = data.discountOnTotalPrice
      ? Number((data.discountOnTotalPrice.discountedAmount.centAmount / CENTS_IN_DOLLAR).toFixed(DECIMAL_PLACES))
      : 0
    const initialPrice = Number((data.totalPrice.centAmount / CENTS_IN_DOLLAR).toFixed(DECIMAL_PLACES)) + discountPrice
    const totalPrice = initialPrice - discountPrice
    return { initialPrice: initialPrice, discountPrice: discountPrice, totalPrice: totalPrice }
  }

  const findPromoCodes = (data?: Cart): Array<Code> => {
    if (!data) {
      return []
    }
    return data.discountCodes.map((code) => {
      return {
        name: code.discountCode.obj?.name?.['en-US'],
        id: code.discountCode.id,
      }
    })
  }

  const [priceData, setPriceData] = useState(calculatePrices(data?.body))
  const [promoCodes, setPromoCodes] = useState(findPromoCodes(data?.body))

  useEffect(() => {
    if (!data?.body) return

    setPriceData(calculatePrices(data.body))
    setPromoCodes(findPromoCodes(data?.body))
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
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setFormData((previous) => ({ ...previous, promo: { value } }))
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
                {CartMapper.toCartView(data.body).map((product) => (
                  <CartRow key={product.id} cartItemData={product} refetch={refetch} />
                ))}
              </tbody>
            </table>
            <div className={s.total}>
              <h2 className="title">Price</h2>
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
              <div>Price: {priceData.initialPrice} €</div>
              <div>Cart Discount: {priceData.discountPrice} €</div>
              <div>Total price: {priceData.totalPrice} €</div>
              {promoCodes.map((code) => (
                <div key={code.id}>
                  <p>{code.name?.toString() || 'Loading…'}</p>
                  <Button onClick={() => {}}>Remove</Button>
                </div>
              ))}
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
