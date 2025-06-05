import type { CartState } from '@/app/providers/CartProvider/CartContext.ts'

export type CartContextAction = SetCartId

export enum CartActionType {
  SET_CART_ID = 'SET_CART_ID',
}

type SetCartId = {
  type: CartActionType.SET_CART_ID
  payload: { id?: string }
}

export const cartReducer = (state: CartState, action: CartContextAction): CartState => {
  return { ...state, ...action.payload }
}
