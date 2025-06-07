import { type ReactElement } from 'react'
import Footer from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { CartSection } from '@/components/CartSection/CartSection'

const CartPage = (): ReactElement => {
  return (
    <>
      <Header />
      <CartSection />
      <Footer />
    </>
  )
}

export default CartPage
