import type { ReactElement } from 'react'
import { Header } from '@/components/Header/Header'
import { HeroSection } from '@/components/HeroSection/HeroSection'

const MainPage = (): ReactElement => {
  return (
    <>
      <Header />
      <HeroSection />
      <h1>eCommerce Application Products</h1>
    </>
  )
}

export default MainPage
