import { type ReactElement } from 'react'
import { Header } from '@/components/Header/Header'
import { Category } from '@/components/Category/Category.tsx'

const CatalogPage = (): ReactElement => {
  return (
    <>
      <Header />
      <Category />
    </>
  )
}

export default CatalogPage
