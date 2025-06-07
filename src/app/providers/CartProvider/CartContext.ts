import { createContext, type Dispatch } from 'react'
import type { CartContextAction } from '@/app/providers/CartProvider/CartReducer'

export type CartState = {
  id?: string
  countProducts?: number
}

export type CartContext = {
  state: CartState
  dispatch: Dispatch<CartContextAction>
  loading: boolean
}

export const CartContext = createContext<CartContext>({
  state: {},
  dispatch: (): void => {},
  loading: true,
})
