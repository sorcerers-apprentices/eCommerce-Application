import type { CartActionType } from './CartReducer'
import { createContext, type Dispatch } from 'react'

export type CartState = {
  id?: string
  countProducts?: number
}

export type CartContext = {
  state: CartState
  dispatch: Dispatch<CartActionType>
  loading: boolean
}

export const CartContext = createContext<CartContext>({
  state: {},
  dispatch: (): void => {},
  loading: true,
})
