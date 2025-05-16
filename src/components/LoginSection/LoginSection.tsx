import type { JSX } from 'react'
import { LoginForm } from '@/components/LoginForm/LoginForm'
import { Link } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import s from './LoginSection.module.scss'

export const LoginSection = (): JSX.Element => {
  return (
    <div className={s.section}>
      <div className={s.links}>
        <div>Login</div>
        <div className={s.or}></div>
        <Link to={RoutePath.REGISTRATION} className={s.link}>
          Registration
        </Link>
      </div>
      {/* <LoginRegistrationLinks loginPath={RoutePath.LOGIN} registrationPath="" loginClass="active" regisrtationClass="" /> */}
      <h1 className="title">Log In</h1>
      <LoginForm />
    </div>
  )
}
