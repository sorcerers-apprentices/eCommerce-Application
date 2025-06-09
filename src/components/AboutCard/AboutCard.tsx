import s from './AboutCard.module.scss'
import type { ReactElement } from 'react'

export type ActivitiesTypes = 'feature' | 'CI/CD' | 'chore' | 'tests' | 'styles' | 'refactor' | 'API' | 'routing'

export type AboutCardProps = {
  name: string
  activities: ActivitiesTypes
  gitHubName: string
  gitHubLink: string
  avatarLink: string
  description: string
}

const AboutCard = (props: AboutCardProps): ReactElement => {
  return (
    <div className={s.card}>
      <h3>{props.name}</h3>
      <img src={props.avatarLink} alt={props.gitHubName} className={s.avatar} />
      <p>{props.description}</p>
    </div>
  )
}

export default AboutCard
