import { createContext, type Dispatch } from 'react'
import type { CartContextAction } from '@/app/providers/CartProvider/CartReducer.tsx'

export type CartState = {
  id?: string
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
