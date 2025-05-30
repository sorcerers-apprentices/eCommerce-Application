import type { ReactElement } from 'react'
import { Header } from '@/components/Header/Header'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { Slider } from '@/components/Slider/Slider'

const MainPage = (): ReactElement => {
  return (
    <>
      <Header />
      <HeroSection />
      <Slider />
    </>
  )
}

export default MainPage
