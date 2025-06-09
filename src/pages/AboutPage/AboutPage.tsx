import type { ReactElement } from 'react'
import Footer from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import AboutSection from '@/components/AboutSection/AboutSection'

const AboutPage = (): ReactElement => {
  return (
    <div>
      <Header />
      <h1 className="title">About us</h1>
      <AboutSection />
      <a href="https://rs.school/courses/javascript-ru" target="_blank">
        <img src="/images/rs-logo.png" alt="rs-logo" />
      </a>
      <Footer />
    </div>
  )
}

export default AboutPage
