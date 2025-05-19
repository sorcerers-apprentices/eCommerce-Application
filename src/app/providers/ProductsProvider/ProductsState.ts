import type { Product } from '@commercetools/platform-sdk'

export type ProductsStateType = {
  products: Product[]
}

export const productsState: ProductsStateType = {
  products: [],
}
