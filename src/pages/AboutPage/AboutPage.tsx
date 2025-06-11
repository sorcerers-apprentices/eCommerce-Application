import s from './AboutPage.module.scss'
import type { ReactElement } from 'react'
import Footer from '@/components/Footer/Footer'
import { Magic } from '@/components/Magic/Magic'
import { Header } from '@/components/Header/Header'

const AboutPage = (): ReactElement => {
  return (
    <div className={s.page}>
      <Header />
      <Magic />
      <Footer />
    </div>
  )
}

export default AboutPage
