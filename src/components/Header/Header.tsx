import s from './Header.module.scss'
import type { ReactElement } from 'react'
import { useUser } from '@/hooks/useUser'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/shared/ui/Button/Button'
import { NavigationBar } from './NavigationBar/NavigationBar'

export const Header = (): ReactElement => {
  const { state } = useUser()
  const { logout } = useAuth()

  return (
    <header className={`section ${s.header}`}>
      <h1 className={s.title}>
        <img className="logo" src="./logo.png" alt="logo" />
      </h1>
      <NavigationBar />
      {state.isAuth ? <Button onClick={logout}>Logout</Button> : null}
    </header>
  )
}
