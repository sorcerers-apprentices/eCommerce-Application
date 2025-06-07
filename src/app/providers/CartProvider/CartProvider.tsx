import { api } from '@/server/api'
import { toast } from 'react-hot-toast'
import { CartContext } from './CartContext'
import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { type FetchParameters, useFetch } from '@/shared/hooks/useFetch'
import { type UserState } from '@/app/providers/UserProvider/UserContext'
import { type JSX, type ProviderProps, useMemo, useReducer } from 'react'
import { CartAction, cartReducer } from '@/app/providers/CartProvider/CartReducer'

export const CartProvider = ({ children }: Partial<ProviderProps<UserState>>): JSX.Element => {
  const [state, dispatch] = useReducer(cartReducer, {})

  const fetchOptions = useMemo<FetchParameters<ClientResponse<Cart>>>(
    () => ({
      onSuccess: (response: ClientResponse<Cart>): void => successFetch(response),
      onFailure: async (): Promise<void> => {
        try {
          const response = await api.cart.createCart()
          dispatch({
            type: CartAction.SET_CART_ID,
            payload: { id: response.body.id },
          })
        } catch (_) {
          toast.error('Cannot create shopping cart')
        }
      },
      enabled: !state.id,
    }),
    [state, dispatch]
  )

  const successFetch = (response: ClientResponse<Cart>): void => {
    dispatch({
      type: CartAction.SET_CART_ID,
      payload: { id: response.body.id },
    })
    if (response.body.totalLineItemQuantity) {
      dispatch({
        type: CartAction.SET_COUNT,
        payload: { countProducts: response.body.totalLineItemQuantity },
      })
    }
  }

  const { loading } = useFetch<ClientResponse<Cart>>(api.cart.fetchActiveCart, fetchOptions)
  return <CartContext.Provider value={{ state, dispatch, loading }}>{children}</CartContext.Provider>
}
