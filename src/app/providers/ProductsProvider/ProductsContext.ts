import { createContext } from 'react'
import { productsState, type ProductsStateType } from './ProductsState'

export type ProductsContextType = {
  products: ProductsStateType
  setProducts: (newProducts: ProductsStateType) => void
}

export const ProductsContext = createContext<ProductsContextType>({
  products: productsState,
  setProducts: (): void => {},
})
