import type { JSX } from 'react'
import { type ReactNode, useState } from 'react'
import { ProductsContext } from './ProductsContext'
import { productsState, type ProductsStateType } from './ProductsState'

type ProductsProviderProperties = {
  children: ReactNode
}

export function ProductsProvider({ children }: ProductsProviderProperties): JSX.Element {
  const [products, setProductsState] = useState<ProductsStateType>(productsState)

  const setProducts = (newProducts: ProductsStateType): void => {
    setProductsState(newProducts)
  }

  return <ProductsContext.Provider value={{ products, setProducts }}>{children}</ProductsContext.Provider>
}
