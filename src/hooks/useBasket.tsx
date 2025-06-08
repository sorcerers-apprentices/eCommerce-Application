import { api } from '@/server/api'
import { useFetch } from '@/shared/hooks/useFetch'
import { useCartContext } from '@/hooks/useCartContext'
import { CartAction } from '@/app/providers/CartProvider/CartReducer'
import type { Cart, ClientResponse } from '@commercetools/platform-sdk'

export type BasketOperations = {
  loading: boolean
  error: Error | null
  addProductToCart: (productId: string, quantity?: number) => Promise<void>
  decrementProductInCart: (productId: string) => Promise<void>
  removeProductFromCart: (productId: string, quantity: number) => Promise<void>
  clearBasket: () => Promise<void>
}

export const useBasket = (): BasketOperations => {
  const { state, dispatch } = useCartContext()
  const { data, error, loading, refetch } = useFetch<ClientResponse<Cart>>(api.cart.fetchActiveCart)

  const addProductToCart = async (productId: string, quantity = 1): Promise<void> => {
    if (!state.id) return
    await api.cart.addProductToCart(state.id, productId, quantity)
    dispatch({ type: CartAction.ADD_COUNT, payload: { countProducts: quantity } })
    refetch()
  }

  const decrementProductInCart = async (productId: string): Promise<void> => {
    if (!state.id) return
    await api.cart.decrementProductInCart(state.id, productId)
    dispatch({ type: CartAction.REMOVE_COUNT, payload: { countProducts: 1 } })
    refetch()
  }

  const removeProductFromCart = async (productId: string, quantity: number): Promise<void> => {
    if (!state.id) return
    await api.cart.removeProductFromCart(state.id, productId)
    dispatch({ type: CartAction.REMOVE_COUNT, payload: { countProducts: quantity } })
    refetch()
  }

  const clearBasket = async (): Promise<void> => {
    if (data?.body.id) {
      await api.cart.clearCart(data.body.id)
      dispatch({ type: CartAction.CLEAR_COUNTER })
      refetch()
    }
  }

  return {
    loading,
    error,
    addProductToCart,
    decrementProductInCart,
    removeProductFromCart,
    clearBasket,
  }
}
