import { type JSX } from 'react'
import { productsState } from './ProductsState'
import { type ReactNode, useReducer } from 'react'
import { ProductsReducer } from './ProductsReducer'
import { ProductsContext } from './ProductsContext'

type ProductsProviderProperties = {
  children: ReactNode
}

export function ProductsProvider({ children }: ProductsProviderProperties): JSX.Element {
  const [state, dispatch] = useReducer(ProductsReducer, productsState)

  return <ProductsContext.Provider value={{ state, dispatch }}>{children}</ProductsContext.Provider>
}
