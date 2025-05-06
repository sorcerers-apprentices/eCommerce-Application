import type { JSX } from 'react'
import { createContext, type ReactNode, useState } from 'react'
import { type ProductsStateType, store } from '@/app/store/AppStore'

export type IProductsContext = {
  products: ProductsStateType
  setProducts: (newProducts: ProductsStateType) => void
}

export const ProductsContext = createContext<IProductsContext>({
  products: store.products,
  setProducts: (): void => {},
})

export function ProductsProvider({ children }: { children: ReactNode }): JSX.Element {
  const [products, setProductsState] = useState<ProductsStateType>(store.products)

  const setProducts = (newProducts: ProductsStateType): void => {
    setProductsState(newProducts)
  }

  return <ProductsContext.Provider value={{ products, setProducts }}>{children}</ProductsContext.Provider>
}
