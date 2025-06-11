import { api } from '@/server/api'
import { useFetch } from '@/shared/hooks/useFetch'
import { useCartContext } from '@/hooks/useCartContext'
import { CartAction } from '@/app/providers/CartProvider/CartReducer'
import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'

export type CartOperations = {
  data: ClientResponse<Cart> | null
  loading: boolean
  error: Error | null
  refetch: () => void
  addProductToCart: (productId: string, quantity?: number) => Promise<void>
  decrementProductInCart: (productId: string) => Promise<void>
  removeProductFromCart: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
  applyDiscountCode: (code: string) => Promise<void>
}

export const useCart = (): CartOperations => {
  const { state, dispatch } = useCartContext()
  const { data, error, loading, refetch } = useFetch<ClientResponse<Cart>>(api.cart.fetchActiveCart)

  const [stateData, setStateData] = useState<ClientResponse<Cart> | null>(null)
  const [stateLoading, setStateLoading] = useState<boolean>(loading)
  const [stateError, setStateError] = useState<Error | null>(error)

  useEffect(() => {
    setStateData(data)
    console.log(data)
  }, [data])

  useEffect(() => {
    setStateLoading(loading)
  }, [loading])

  useEffect(() => {
    setStateError(error instanceof Error ? error : null)
  }, [error])
  const addProductToCart = async (productId: string, quantity?: number): Promise<void> => {
    if (state.id) {
      setStateLoading(true)
      setStateError(null)
      try {
        const response = await api.cart.addProductToCart(state.id, productId, quantity ?? 1)
        setStateData(response)
        const productName = response.body.lineItems.find((item) => item.productId === productId)?.name['en-US'] ?? ''
        toast.success(`${productName} added to cart`)
        const total = response.body?.totalLineItemQuantity ?? 0
        dispatch({ type: CartAction.SET_COUNTER, payload: { countProducts: total } })
      } catch (error) {
        setStateError(error instanceof Error ? error : null)
        toast.error('Error adding product to cart')
      } finally {
        setStateLoading(false)
      }
    }
  }

  const decrementProductInCart = async (productId: string): Promise<void> => {
    if (state.id) {
      setStateLoading(true)
      setStateError(null)
      try {
        const productName = stateData?.body.lineItems.find((item) => item.productId === productId)?.name['en-US'] ?? ''
        const response = await api.cart.decrementProductInCart(state.id, productId)
        setStateData(response)
        toast.success(`${productName} deleted from cart`)
        const total = response.body?.totalLineItemQuantity ?? 0
        dispatch({ type: CartAction.SET_COUNTER, payload: { countProducts: total } })
      } catch (error) {
        setStateError(error instanceof Error ? error : null)
        toast.error('Error removing product from cart')
      } finally {
        setStateLoading(false)
      }
    }
  }

  const removeProductFromCart = async (productId: string): Promise<void> => {
    if (state.id) {
      setStateLoading(true)
      setStateError(null)
      try {
        const productName = stateData?.body.lineItems.find((item) => item.productId === productId)?.name['en-US'] ?? ''
        const response = await api.cart.removeProductFromCart(state.id, productId)
        setStateData(response)
        toast.success(`${productName} deleted from cart`)
        const total = response.body?.totalLineItemQuantity ?? 0
        dispatch({ type: CartAction.SET_COUNTER, payload: { countProducts: total } })
      } catch (error) {
        setStateError(error instanceof Error ? error : null)
        toast.error('Error removing product from cart')
      } finally {
        setStateLoading(false)
      }
    }
  }

  const clearCart = async (): Promise<void> => {
    if (!state.id) return
    setStateLoading(true)
    setStateError(null)
    try {
      const response = await api.cart.clearCart(state.id)
      setStateData(response)
      toast.success('Cart cleared')
      const total = response.body.totalLineItemQuantity ?? 0
      dispatch({ type: CartAction.SET_COUNTER, payload: { countProducts: total } })
    } catch (error) {
      setStateError(error instanceof Error ? error : null)
      toast.error('Error clearing cart')
    } finally {
      setStateLoading(false)
    }
  }

  const applyDiscountCode = async (code: string): Promise<void> => {
    if (state.id) {
      setStateLoading(true)
      setStateError(null)
      try {
        const response = await api.cart.applyDiscountCode(state.id, code)
        setStateData(response)
        toast.success(`Promo code is applied`)
      } catch (error) {
        setStateError(error instanceof Error ? error : null)
        toast.error('There is no such promotion')
      } finally {
        setStateLoading(false)
      }
    }
  }

  return {
    data: stateData,
    loading: stateLoading,
    error: stateError,
    refetch,
    addProductToCart,
    decrementProductInCart,
    removeProductFromCart,
    clearCart,
    applyDiscountCode,
  }
}
