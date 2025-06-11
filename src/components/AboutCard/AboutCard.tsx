import s from './AboutCard.module.scss'
import type { ReactElement } from 'react'
import { FaGithub } from 'react-icons/fa'

export type ActivitiesTypes = 'feature' | 'CI/CD' | 'chore' | 'tests' | 'styles' | 'refactor' | 'API' | 'routing'

export type AboutCardProps = {
  name: string
  activities: ActivitiesTypes[]
  gitHubName: string
  gitHubLink: string
  avatarLink: string
  description: string
}

const activityLabels = {
  feature: '⭐️ Features',
  'CI/CD': '🔄 CI/CD',
  chore: '🧹 Chores',
  tests: '🧪 Testing',
  styles: '🎨 Styling',
  refactor: '♻️ Refactoring',
  API: '🌐 API',
  routing: '🛣️ Routing',
}

const AboutCard = (props: AboutCardProps): ReactElement => {
  return (
    <div className={s.card}>
      <img src={props.avatarLink} alt={props.gitHubName} className={s.avatar} />
      <h3 className={s.name}>{props.name}</h3>

      <div className={s.activities}>
        {props.activities.map((activity) => (
          <div className={s.activity} data-type={activity}>
            <span>{activityLabels[activity]}</span>
          </div>
        ))}
      </div>

      <p className={s.description}>{props.description}</p>
      <a href={props.gitHubLink} target="_blank" className={s.githublink}>
        <FaGithub className={s.githubicon} />
        <span>{props.gitHubName}</span>
      </a>
    </div>
  )
}

export default AboutCard
