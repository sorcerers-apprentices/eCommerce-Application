import s from './About.module.scss'
import type { ReactElement } from 'react'
import AboutUs from '@/components/AboutUs/AboutUs'
import AboutCard, { type AboutCardProps } from '@/components/AboutCard/AboutCard'

const ArtemDataProps: AboutCardProps = {
  name: 'Artem Gassan',
  activities: ['feature', 'routing', 'CI/CD', 'tests', 'refactor'],
  gitHubName: 'artemgassan',
  gitHubLink: 'https://github.com/artemgassan',
  avatarLink: 'https://avatars.githubusercontent.com/u/158855420?v=4',
  description:
    'Allowed myself to provide the project with navigational precision in tricky routing scenarios and providing the team with slightly more convenient CI/CD processes. Excellent at wearing out the team by searching for and implementing more optimal practices. Behind the scenes of the project — a navigator, that slightly guides its infrastructure and ensures that the project is maintained in production.',
  part: 'Team lead',
}

const DaryaDataProps: AboutCardProps = {
  name: 'Darya Kolenchenko',
  activities: ['feature', 'tests', 'API', 'backend', 'refactor'],
  gitHubName: 'dariechka',
  gitHubLink: 'https://github.com/dariechka',
  avatarLink: 'https://avatars.githubusercontent.com/u/149780473?v=4',
  description:
    'Our hardworking and responsible guide in the world of backlog, the general master of negotiations between the frontend and the server, possessing amazing self-discipline. By closing and resolving any issues clearly, confidently and coolly, she allowed the whole team to work calmly with asynchronous data without being distracted by the technical complexities of communicating with the server. No magic - just precise requests, painstaking results and nerves of steel when dealing with unstable answers.',
  part: 'Lead API Integration Specialist',
}

const AnnaDataProps: AboutCardProps = {
  name: 'Anna Vasilevich',
  activities: ['feature', 'styles', 'chore', 'tests', 'design'],
  gitHubName: 'dzichonka',
  gitHubLink: 'https://github.com/dzichonka',
  avatarLink: 'https://avatars.githubusercontent.com/u/73832561?v=4',
  description:
    ' I’m Anna — a front-end developer with a passion for clean design, smooth user experiences, and just the right touch of JavaScript magic. My journey into IT began with Java, but I soon realized that I’m most inspired when working on the visual side of things. That’s how I found my place in frontend — where design meets functionality. I absolutely love RS-school course. The final team project was a real highlight: working with an amazing team taught me a lot about collaboration, code reviews, and creative problem-solving.',
  part: 'Chief UX/UI Officer',
}

export const About = (): ReactElement => {
  return (
    <div className={s.about}>
      <h1 className={s.title}>About us</h1>
      <section className={s.section}>
        <AboutCard {...DaryaDataProps} />
        <AboutCard {...AnnaDataProps} />
        <AboutCard {...ArtemDataProps} />
      </section>
      <AboutUs />
      <a href="https://rs.school/" target="_blank" className={s.logo}>
        <img src="/images/logo-rs.svg" alt="rs-logo" />
      </a>
    </div>
  )
}
