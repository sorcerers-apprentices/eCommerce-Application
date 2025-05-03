import { Link } from 'react-router-dom'
import type { ReactElement } from 'react'
import { LoginForm } from '@/components/LoginForm/LoginForm'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

const LoginPage = (): ReactElement => {
  return (
    <div>
      <LoginForm />
      <Link to={RoutePath.MAIN}>Go Main Page</Link>
    </div>
  )
}

export default LoginPage
