import type { ReactElement } from 'react'
import Footer from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { HeroSection } from '@/components/HeroSection/HeroSection'

const MainPage = (): ReactElement => {
  return (
    <>
      <Header />
      <HeroSection />
      <Footer />
    </>
  )
}
export default MainPage
