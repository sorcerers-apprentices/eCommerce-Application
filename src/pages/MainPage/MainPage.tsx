import type { ReactElement } from 'react'
import Footer from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { Slider } from '@/components/Slider/Slider'
import { HeroSection } from '@/components/HeroSection/HeroSection'

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
      <Footer />
    </>
  )
}

export default MainPage
