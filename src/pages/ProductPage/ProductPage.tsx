import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '@/components/Header/Header'

const ProductPage = (): ReactElement => {
  const { sku } = useParams()

  return (
    <>
      <Header />
      <h2>Product SKU: {sku}</h2>
    </>
  )
}

export default ProductPage
