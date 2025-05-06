import type { JSX } from 'react'
import { createContext, type ReactNode, useState } from 'react'
import { productsState, type ProductsStateType } from './ProductsState'

export type IProductsContext = {
  products: ProductsStateType
  setProducts: (newProducts: ProductsStateType) => void
}

export const ProductsContext = createContext<IProductsContext>({
  products: productsState,
  setProducts: (): void => {},
})

export function ProductsProvider({ children }: { children: ReactNode }): JSX.Element {
  const [products, setProductsState] = useState<ProductsStateType>(productsState)

  const setProducts = (newProducts: ProductsStateType): void => {
    setProductsState(newProducts)
  }

  return <ProductsContext.Provider value={{ products, setProducts }}>{children}</ProductsContext.Provider>
}
