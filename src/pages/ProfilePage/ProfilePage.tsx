import { Link } from 'react-router-dom'
import type { ReactElement } from 'react'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

const ProfilePage = (): ReactElement => {
  return (
    <div>
      <h1>Profile Page</h1>
      <Link to={RoutePath.MAIN}>Go Home Page</Link>
    </div>
  )
}

export default ProfilePage
