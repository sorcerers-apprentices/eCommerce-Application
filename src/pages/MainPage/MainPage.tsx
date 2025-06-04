import type { ReactElement } from 'react'
import { Header } from '@/components/Header/Header'
import { HeroSection } from '@/components/HeroSection/HeroSection'

const MainPage = (): ReactElement => {
  return (
    <>
      <Header />
      <HeroSection />
    </>
  )
}
export default MainPage
