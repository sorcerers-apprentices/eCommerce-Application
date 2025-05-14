import s from './Header.module.scss'
import type { ReactElement } from 'react'
import { useUser } from '@/hooks/useUser'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/shared/ui/Button/Button'
import { Link } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { NavigationBar } from './NavigationBar/NavigationBar'
import { UserBar } from './UserBar/UserBar'

export const Header = (): ReactElement => {
  const { state } = useUser()
  const { logout } = useAuth()

  return (
    <header className={`section ${s.header}`}>
      <Link to={RoutePath.MAIN}>
        <img className={s.logo} src="./logo.png" alt="logo" />
      </Link>
      <NavigationBar />
      <UserBar />
      {state.isAuth ? <Button onClick={logout}>Logout</Button> : null}
    </header>
  )
}
