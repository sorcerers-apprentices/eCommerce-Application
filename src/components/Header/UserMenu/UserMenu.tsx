import type { ReactElement } from 'react'

import { useUser } from '@/hooks/useUser'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/shared/ui/Button/Button'
import { Link } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
// import { NavigationBar } from './NavigationBar/NavigationBar'
// import { UserBar } from './UserBar/UserBar'
import s from './UserMenu.module.scss'

type IUserMenuProperties = {
  onClose: () => void
}
export const UserMenu = ({ onClose }: IUserMenuProperties): ReactElement => {
  const { state } = useUser()
  const { logout } = useAuth()
  const handleLogout = (): void => {
    logout()
    onClose()
  }

  return (
    <div className={s.menu}>
      {state.isAuth ? (
        <>
          <Button onClick={handleLogout} className={s.button}>
            Logout
          </Button>
          <Link to={RoutePath.REGISTRATION} className={s.button}>
            Registration
          </Link>
          <Link to={RoutePath.PROFILE} className={s.button}>
            Profile
          </Link>
        </>
      ) : (
        <>
          <Link to={RoutePath.LOGIN} className={s.button}>
            Login
          </Link>
          <Link to={RoutePath.REGISTRATION} className={s.button}>
            Registration
          </Link>
        </>
      )}
    </div>
  )
}
