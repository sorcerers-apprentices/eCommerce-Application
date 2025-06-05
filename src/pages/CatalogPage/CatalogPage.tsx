import { type ReactElement } from 'react'
import Footer from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { Category } from '@/components/Category/Category'

const CatalogPage = (): ReactElement => {
  return (
    <>
      <Header />
      <Category />
      <Footer />
    </>
  )
}

export default CatalogPage
