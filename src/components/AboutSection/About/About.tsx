import s from './About.module.scss'
import type { ReactElement } from 'react'
import AboutCard, { type AboutCardProps } from '@/components/AboutCard/AboutCard'

const ArtemDataProps: AboutCardProps = {
  name: 'Artem Gassan',
  activities: ['feature', 'styles', 'refactor'],
  gitHubName: 'artemgassan',
  gitHubLink: 'https://github.com/artemgassan',
  avatarLink: 'https://avatars.githubusercontent.com/u/158855420?v=4',
  description: 'There will be a description here later',
}

const DaryaDataProps: AboutCardProps = {
  name: 'Darya Kolenchenko',
  activities: ['tests', 'CI/CD', 'API'],
  gitHubName: 'dariechka',
  gitHubLink: 'https://github.com/dariechka',
  avatarLink: 'https://avatars.githubusercontent.com/u/149780473?v=4',
  description: 'There will be a description here later',
}

const AnnaDataProps: AboutCardProps = {
  name: 'Anna Vasilevich',
  activities: ['routing', 'feature', 'chore'],
  gitHubName: 'dzichonka',
  gitHubLink: 'https://github.com/dzichonka',
  avatarLink: 'https://avatars.githubusercontent.com/u/73832561?v=4',
  description: 'There will be a description here later',
}

export const About = (): ReactElement => {
  return (
    <div className={s.about}>
      <h1>About us</h1>
      <section className={s.section}>
        <AboutCard {...DaryaDataProps} />
        <AboutCard {...AnnaDataProps} />
        <AboutCard {...ArtemDataProps} />
      </section>
      <a href="https://rs.school/" target="_blank" className={s.logo}>
        <img src="/images/logo-rs.svg" alt="rs-logo" />
      </a>
    </div>
  )
}
