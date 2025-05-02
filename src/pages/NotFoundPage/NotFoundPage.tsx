import { Link } from 'react-router-dom'
import type { ReactElement } from 'react'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

const NotFoundPage = (): ReactElement => {
  return (
    <div>
      <h1>404 Page not found</h1>
      <Link to={RoutePath.MAIN}>Go Home Page</Link>
    </div>
  )
}

export default NotFoundPage
