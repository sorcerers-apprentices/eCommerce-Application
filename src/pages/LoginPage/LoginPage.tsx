import { useUser } from '@/hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { type ReactElement, useEffect } from 'react'
import { Header } from '@/components/Header/Header'
import { LoginForm } from '@/components/LoginForm/LoginForm'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

const LoginPage = (): ReactElement => {
  const { state } = useUser()
  const navigation = useNavigate()

  useEffect((): void => {
    if (state.isAuth) {
      navigation(RoutePath.MAIN)
    }
  }, [state.isAuth, navigation])

  return (
    <>
      <Header />
      <LoginForm />
    </>
  )
}

export default LoginPage
