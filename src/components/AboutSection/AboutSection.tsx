import type { ReactElement } from 'react'
import s from './AboutSection.module.scss'
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
    'An artist and engineer in one person, our main UI architect and visual designer: from the very start, the project acquired its character through her independent and competent visual solutions. She set the tone for the interface and took full and clear control over the tasks so that “it not only worked, but also looked good,” finding and taking into account the critical nuances of frontend development. Her attention to detail has saved us from bugs and unnecessary edits more than once, and her creative solutions have sometimes turned out to be exactly what was missing for the final touch.',
  part: 'Chief UX/UI Officer',
}

const AboutSection = (): ReactElement => {
  return (
    <section className={s.component}>
      <div className={s.section}>
        <AboutCard {...DaryaDataProps} />
        <AboutCard {...AnnaDataProps} />
        <AboutCard {...ArtemDataProps} />
      </div>
      <AboutUs />
    </section>
  )
}

export default AboutSection
