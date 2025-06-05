import { type JSX, type ProviderProps, useMemo, useReducer } from 'react'
import { type UserState } from '@/app/providers/UserProvider/UserContext.ts'
import { CartActionType, cartReducer } from '@/app/providers/CartProvider/CartReducer.tsx'
import { CartContext } from './CartContext'
import { type FetchParameters, useFetch } from '@/shared/hooks/useFetch.tsx'
import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { api } from '@/server/api.ts'
import { toast } from 'react-hot-toast'

export const CartProvider = ({ children }: Partial<ProviderProps<UserState>>): JSX.Element => {
  const [state, dispatch] = useReducer(cartReducer, {})

  const fetchOptions = useMemo<FetchParameters<ClientResponse<Cart>>>(
    () => ({
      onSuccess: (response: ClientResponse<Cart>): void =>
        dispatch({
          type: CartActionType.SET_CART_ID,
          payload: { id: response.body.id },
        }),
      onFailure: async (): Promise<void> => {
        try {
          const response = await api.cart.createCart()
          dispatch({
            type: CartActionType.SET_CART_ID,
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

  const { loading } = useFetch<ClientResponse<Cart>>(api.cart.fetchActiveCart, fetchOptions)
  return <CartContext.Provider value={{ state, dispatch, loading }}>{children}</CartContext.Provider>
}
