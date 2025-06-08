import type { CartState } from './CartContext'

export enum CartAction {
  SET_CART_ID = 'SET_CART_ID',
  SET_COUNTER = 'SET_COUNTER',
  ADD_COUNT = 'ADD_COUNT',
  REMOVE_COUNT = 'REMOVE_COUNT',
  CLEAR_COUNTER = 'CLEAR_COUNTER',
}

export type CartActionType =
  | { type: CartAction.SET_CART_ID; payload: { id?: string } }
  | { type: CartAction.SET_COUNTER; payload: { countProducts: number } }
  | { type: CartAction.ADD_COUNT; payload: { countProducts: number } }
  | { type: CartAction.REMOVE_COUNT; payload: { countProducts: number } }
  | { type: CartAction.CLEAR_COUNTER }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case CartAction.SET_CART_ID:
      return { ...state, ...action.payload }
    case CartAction.SET_COUNTER:
      return { ...state, countProducts: action.payload.countProducts }
    case CartAction.ADD_COUNT:
      return { ...state, countProducts: (state.countProducts || 0) + action.payload.countProducts }
    case CartAction.REMOVE_COUNT:
      return { ...state, countProducts: (state.countProducts || 0) - action.payload.countProducts }
    case CartAction.CLEAR_COUNTER:
      return { ...state, countProducts: 0 }
    default:
      return state
  }
}
