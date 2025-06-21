import s from './AboutPage.module.scss'
import type { ReactElement } from 'react'
import Footer from '@/components/Footer/Footer'
import { AboutSection } from '@/components/AboutSection/AboutSection'
import { Header } from '@/components/Header/Header'

const AboutPage = (): ReactElement => {
  return (
    <div className={s.page}>
      <Header />
      <AboutSection />
      <Footer />
    </div>
  )
}

export default AboutPage
