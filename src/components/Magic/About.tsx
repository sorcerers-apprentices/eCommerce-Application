import s from './About.module.scss'
import type { ReactElement } from 'react'
import AboutSection from '@/components/AboutSection/AboutSection'

export const About = (): ReactElement => {
  return (
    <div className={s.about}>
      <h1>About us</h1>
      <AboutSection />
      <a href="https://rs.school/courses/javascript-ru" target="_blank" className={s.logo}>
        <img src="/images/rs-logo.png" alt="rs-logo" />
      </a>
    </div>
  )
}
