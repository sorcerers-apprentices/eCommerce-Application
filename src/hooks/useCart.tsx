import { useContext } from 'react'
import { CartContext } from '@/app/providers/CartProvider/CartContext'

export const useCart = (): CartContext => {
  const basket: CartContext = useContext(CartContext)
  if (!basket) {
    throw new Error('Missing Cart Context')
  }
  return basket
}
