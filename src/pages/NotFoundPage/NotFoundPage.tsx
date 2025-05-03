import { Link } from 'react-router-dom'
import type { ReactElement } from 'react'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import './NotFoundPage.scss'

const NotFoundPage = (): ReactElement => {
  return (
    <div className={'not-found-page'}>
      <h1 className={'not-found-page_number'}>404</h1>
      <h2 className={'not-found-page_title'}>Oops!I may have chewed up the power code</h2>
      <h3 className={'not-found-page_text'}>Go back to main page to continue your visit</h3>
      <Link to={RoutePath.MAIN} className={'not-found-page_link'}>
        Go Home Page
      </Link>
      <div className={'not-found-page_image'}>
        <img src={'/not-found.jpg'} alt="golden-retriever" className={'image'} />
      </div>
    </div>
  )
}

export default NotFoundPage
