import type { Cart, Category, ClientResponse, ProductProjection } from '@commercetools/platform-sdk'
import { CENTS_IN_EURO, DECIMAL_PLACES } from '@/shared/utilities/price.ts'

export const findRootCategories = (categories: Array<Category> | undefined): Array<Category> | undefined =>
  categories?.filter((category) => category.parent === undefined)
export const findDirectChildren = (
  parent: Category,
  categories: Array<Category> | undefined
): Array<Category> | undefined => categories?.filter((category: Category) => category.parent?.id === parent.id)
export const findAttributeData = (
  name: string,
  product?: ClientResponse<ProductProjection> | null
): string | undefined => {
  return product?.body.masterVariant.attributes?.find((attribute) => attribute.name === name)?.value
}

export type PriceData = {
  initialPrice: number
  discountPrice: number
  totalPrice: number
}

export const calculatePrices = (data?: Cart): PriceData => {
  if (!data) {
    return { initialPrice: 0, discountPrice: 0, totalPrice: 0 }
  }

  let discountPriceCents = 0
  discountPriceCents += data.lineItems.reduce((acc, item) => {
    const cartDiscountPerItem = item.discountedPricePerQuantity?.find((discount) =>
      discount.discountedPrice.includedDiscounts.some((incl) => incl.discount.typeId === 'cart-discount')
    )
    if (!cartDiscountPerItem) return acc

    const discountAmount =
      cartDiscountPerItem.discountedPrice.includedDiscounts.find((incl) => incl.discount.typeId === 'cart-discount')
        ?.discountedAmount.centAmount ?? 0

    return acc + discountAmount * cartDiscountPerItem.quantity
  }, 0)

  if (data.discountOnTotalPrice) {
    discountPriceCents += data.discountOnTotalPrice.discountedAmount.centAmount
  }

  const discountPrice = discountPriceCents / CENTS_IN_EURO

  const initialPrice = Number((data.totalPrice.centAmount / CENTS_IN_EURO + discountPrice).toFixed(DECIMAL_PLACES))
  const totalPrice = Number((initialPrice - discountPrice).toFixed(DECIMAL_PLACES))
  return { initialPrice: initialPrice, discountPrice: discountPrice, totalPrice: totalPrice }
}

export type Code = {
  name: string | undefined
  id: string
}

export const findPromoCodes = (data?: Cart): Array<Code> => {
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
