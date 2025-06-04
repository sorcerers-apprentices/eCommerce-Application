import type { ReactElement } from 'react'
import Footer from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'

const AboutPage = (): ReactElement => {
  return (
    <div>
      <Header />
      <h1 className="title">About Page</h1>
      <Footer />
    </div>
  )
}

export default AboutPage
