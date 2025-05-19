import { createContext, type Dispatch } from 'react'
import type { ProductsActionType } from './ProductsReducer'
import { productsState, type ProductsStateType } from './ProductsState'

export type ProductsContextType = {
  state: ProductsStateType
  dispatch: Dispatch<ProductsActionType>
}

const defaultDispatch: Dispatch<ProductsActionType> = (): void => {}

export const ProductsContext = createContext<ProductsContextType>({
  state: productsState,
  dispatch: defaultDispatch,
})
