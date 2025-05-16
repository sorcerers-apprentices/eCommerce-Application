import type { JSX } from 'react'
import { RegistrationForm } from '@/components/RegistrationForm/RegistrationForm'
import { Link } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import s from './RegistrationSection.module.scss'

export const RegistrationSection = (): JSX.Element => {
  return (
    <div className={s.section}>
      <div className={s.links}>
        <Link to={RoutePath.LOGIN} className={s.link}>
          Login
        </Link>
        <div className={s.or}></div>
        <div>Registration</div>
      </div>
      <h1 className="title">Create Account</h1>
      <RegistrationForm />
    </div>
  )
}
