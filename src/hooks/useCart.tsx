import { api } from '@/server/api'
import { useFetch } from '@/shared/hooks/useFetch'
import { useCartContext } from '@/hooks/useCartContext'
import { CartAction } from '@/app/providers/CartProvider/CartReducer'
import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { toast } from 'react-hot-toast'

export type CartOperations = {
  loading: boolean
  error: Error | null
  addProductToCart: (productId: string, quantity?: number) => Promise<void>
  decrementProductInCart: (productId: string) => Promise<void>
  removeProductFromCart: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
}

export const useCart = (): CartOperations => {
  const { state, dispatch } = useCartContext()
  const { data, error, loading } = useFetch<ClientResponse<Cart>>(api.cart.fetchActiveCart)

  const addProductToCart = async (productId: string, quantity?: number): Promise<void> => {
    if (state.id) {
      try {
        const response = await api.cart.addProductToCart(state.id, productId, quantity ?? 1)
        const productName = response.body.lineItems.find((item) => item.productId === productId)?.name['en-US'] ?? ''
        toast.success(`${productName} added to cart`)
        const num = response?.body?.totalLineItemQuantity ?? 0
        dispatch({ type: CartAction.SET_COUNTER, payload: { countProducts: num } })
      } catch {
        toast.error('Error adding product to cart')
      }
    }
  }
  const decrementProductInCart = async (productId: string): Promise<void> => {
    if (state.id) {
      try {
        const productName = data?.body.lineItems.find((item) => item.productId === productId)?.name['en-US'] ?? ''
        const response = await api.cart.decrementProductInCart(state.id, productId)
        toast.success(`${productName} deleted from cart`)
        const num = response?.body?.totalLineItemQuantity ?? 0
        dispatch({ type: CartAction.SET_COUNTER, payload: { countProducts: num } })
      } catch {
        toast.error('Error adding product to cart')
      }
    }
  }
  const removeProductFromCart = async (productId: string): Promise<void> => {
    if (state.id) {
      try {
        const productName = data?.body.lineItems.find((item) => item.productId === productId)?.name['en-US'] ?? ''
        const response = await api.cart.removeProductFromCart(state.id, productId)
        toast.success(`${productName} deleted from cart`)
        const num = response?.body?.totalLineItemQuantity ?? 0
        dispatch({ type: CartAction.SET_COUNTER, payload: { countProducts: num } })
      } catch {
        toast.error('Error adding product to cart')
      }
    }
  }
  const clearCart = async (): Promise<void> => {
    if (!state.id) return
    try {
      const response = await api.cart.clearCart(state.id)
      toast.success('Cart cleared')
      const total = response.body.totalLineItemQuantity ?? 0
      dispatch({ type: CartAction.SET_COUNTER, payload: { countProducts: total } })
    } catch {
      toast.error('Error clearing cart')
    }
  }
  return {
    loading,
    error,
    addProductToCart,
    decrementProductInCart,
    removeProductFromCart,
    clearCart,
  }
}
