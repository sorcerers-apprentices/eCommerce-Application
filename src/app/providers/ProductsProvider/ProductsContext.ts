import { createContext } from 'react'
import { productsState, type ProductsStateType } from './ProductsState'

export type IProductsContext = {
  products: ProductsStateType
  setProducts: (newProducts: ProductsStateType) => void
}

export const ProductsContext = createContext<IProductsContext>({
  products: productsState,
  setProducts: (): void => {},
})
