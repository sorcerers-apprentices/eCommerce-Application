import type { ReactElement } from 'react'
import { Header } from '@/components/Header/Header'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { Slider } from '@/components/Slider/Slider'

const MainPage = (): ReactElement => {
  return (
    <>
      <Header />
      <HeroSection />
      <Slider
        images={[
          { url: '/images/dog-brown-bg.jpg', name: 'dog' },
          { url: '/images/dog-green-bg.jpg', name: 'dog' },
          { url: '/images/cat-yellow-bg.jpeg', name: 'cat' },
        ]}
      />
    </>
  )
}

export default MainPage
