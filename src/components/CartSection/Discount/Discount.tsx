import { type JSX } from 'react'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/shared/ui/Button/Button'
import Loader from '@/shared/ui/Loader/Loader'

const CENTS_IN_DOLLAR = 100
const DECIMAL_PLACES = 2

export const Discount = (): JSX.Element => {
  const { data, error, loading, applyDiscountCode } = useCart()
  const totalPrice =
    data?.body.totalPrice?.centAmount !== undefined
      ? Number((data.body.totalPrice.centAmount / CENTS_IN_DOLLAR).toFixed(DECIMAL_PLACES))
      : 0

  const discountSum =
    data?.body.discountOnTotalPrice?.discountedAmount.centAmount !== undefined
      ? Number((data.body.discountOnTotalPrice.discountedAmount.centAmount / CENTS_IN_DOLLAR).toFixed(DECIMAL_PLACES))
      : 0
  const subtotalPrice = totalPrice + discountSum

  return (
    <>
      {loading && <Loader />}
      {error && <div>{error.message}</div>}
      {data && data.body.lineItems.length > 0 && (
        <>
          <Button
            type="button"
            onClick={async () => {
              await applyDiscountCode('Reviewer20')
            }}
          >
            Apply promo code
          </Button>
          <p>Subtotal: {subtotalPrice}</p>
          <p>Discount: {discountSum}</p>
          <p>Total price: {totalPrice}</p>
        </>
      )}
    </>
  )
}
