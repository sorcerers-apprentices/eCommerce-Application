import type { ProductsStateType } from './ProductsState'
import type { Product } from '@commercetools/platform-sdk'

export enum ProductsAction {
  SET_ALL = 'SET_ALL',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export type ProductsActionType =
  | { type: ProductsAction.SET_ALL; payload: Product[] }
  | { type: ProductsAction.ADD; payload: Product }
  | { type: ProductsAction.REMOVE; payload: { id: string } }

export const ProductsReducer = (state: ProductsStateType, action: ProductsActionType): ProductsStateType => {
  switch (action.type) {
    case ProductsAction.SET_ALL:
      return { products: action.payload }
    case ProductsAction.ADD:
      return { products: [...state.products, action.payload] }
    case ProductsAction.REMOVE:
      return { products: state.products.filter((item) => item.id !== action.payload.id) }
    default:
      return state
  }
}
