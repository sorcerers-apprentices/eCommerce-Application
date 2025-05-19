import { Link } from 'react-router-dom'
import type { ReactElement } from 'react'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import s from './NotFoundPage.module.scss'

const NotFoundPage = (): ReactElement => {
  return (
    <div className={['section-dog', s.page].join(' ')}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.description}>
        Oops!
        <br />I may have chewed up the power code
      </h2>
      <Link to={RoutePath.MAIN} className={s.btn}>
        Back to main page
      </Link>
    </div>
  )
}

export default NotFoundPage
