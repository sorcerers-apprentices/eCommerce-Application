import { Header } from '@/components/Header/Header'
import type { ReactElement } from 'react'
//import s from './AboutPage.module.scss'

const AboutPage = (): ReactElement => {
  return (
    <div>
      <Header />
      <h1 className="title">About Page</h1>
    </div>
  )
}

export default AboutPage
