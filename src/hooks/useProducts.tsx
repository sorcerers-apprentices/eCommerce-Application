import { useContext } from 'react'
import { type ProductsContextType, ProductsContext } from '@/app/providers/ProductsProvider/ProductsContext'

export const useProducts = (): ProductsContextType => {
  const products: ProductsContextType = useContext(ProductsContext)
  if (!products) {
    throw new Error('Missing Products Context')
  }
  return products
}
