import { Link } from 'react-router-dom'
import type { ReactElement } from 'react'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { RegistrationForm } from '@/components/RegistrationForm/RegistrationForm.tsx'

const RegistrationPage = (): ReactElement => {
  return (
    <div>
      <h1>Registration Pages</h1>
      <RegistrationForm />
      <Link to={RoutePath.MAIN}>Go Home Page</Link>
    </div>
  )
}

export default RegistrationPage
