import type { ReactElement } from 'react'
import Footer from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { PromoSection } from '@/components/PromoSection/PromoSection'

const MainPage = (): ReactElement => {
  return (
    <>
      <Header />
      <HeroSection />
      <PromoSection />
      <Footer />
    </>
  )
}
export default MainPage
