import { Link } from 'react-router-dom'
import type { ReactElement } from 'react'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import './NotFoundPage.module.scss'

const NotFoundPage = (): ReactElement => {
  return (
    <div className={'section section-dog not-found-page'}>
      <h1 className={'title'}>404</h1>
      <h2>
        Oops!
        <br />I may have chewed up the power code
        <br />
        Go back to main page to continue your visit
      </h2>
      <Link to={RoutePath.MAIN} className={'btn'}>
        Back to main page
      </Link>
    </div>
  )
}

export default NotFoundPage
