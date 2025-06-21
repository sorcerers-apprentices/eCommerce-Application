import type { CartState } from './CartContext'

export enum CartAction {
  SET_CART_ID = 'SET_CART_ID',
  SET_COUNTER = 'SET_COUNTER',
}

export type CartActionType =
  | { type: CartAction.SET_CART_ID; payload: { id?: string } }
  | { type: CartAction.SET_COUNTER; payload: { countProducts: number } }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case CartAction.SET_CART_ID:
      return { ...state, ...action.payload }
    case CartAction.SET_COUNTER:
      return { ...state, countProducts: action.payload.countProducts }
    default:
      return state
  }
}
