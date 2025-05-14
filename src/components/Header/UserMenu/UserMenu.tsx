import type { ReactElement } from 'react'
// import { useUser } from '@/hooks/useUser'
// import { useAuth } from '@/hooks/useAuth'
// import { Button } from '@/shared/ui/Button/Button'
// import { Link } from 'react-router-dom'
// import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
// import { NavigationBar } from './NavigationBar/NavigationBar'
// import { UserBar } from './UserBar/UserBar'
import s from './UserMenu.module.scss'

export const UserMenu = (): ReactElement => {
  // const { state } = useUser()
  // const { logout } = useAuth()

  return (
    <div className={s.menu}>
      <h3>Will be Menu in a moment</h3>
      {/* <Link to={RoutePath.MAIN} className={s.logo}>
        <img className={s.logo} src="./logo.png" alt="logo" />
      </Link>
      <NavigationBar />
      <UserBar />
      {state.isAuth ? <Button onClick={logout}>Logout</Button> : null} */}
    </div>
  )
}
