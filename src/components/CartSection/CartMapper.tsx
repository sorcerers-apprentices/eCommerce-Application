import type { TCartItem } from '@/types/user-types'
import type { Cart } from '@commercetools/platform-sdk'

const DECIMAL_BASE = 10

export const CartMapper = {
  toCartView(cartData: Cart): TCartItem[] {
    return cartData.lineItems.map((item) => {
      const fractionDigits = item.price.value.fractionDigits
      const discountedPrice = item.price.discounted?.value.centAmount

      const name = item.name['en-US'] || 'No name'
      const image = item.variant.images?.[0]?.url || ''
      let price = +(item.price.value.centAmount / DECIMAL_BASE ** fractionDigits).toFixed(fractionDigits)

      if (discountedPrice) {
        price = +(discountedPrice / DECIMAL_BASE ** fractionDigits).toFixed(fractionDigits)
      }
      const quantity = item.quantity
      const total = +(item.totalPrice.centAmount / DECIMAL_BASE ** fractionDigits).toFixed(fractionDigits)
      return {
        id: item.id,
        name,
        image,
        price,
        quantity,
        total,
      }
    })
  },
}
