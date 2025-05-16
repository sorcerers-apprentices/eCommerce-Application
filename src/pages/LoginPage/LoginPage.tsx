import { useUser } from '@/hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { type ReactElement, useEffect } from 'react'
import { Header } from '@/components/Header/Header'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { LoginSection } from '@/components/LoginSection/LoginSection'

const LoginPage = (): ReactElement => {
  const { state } = useUser()
  const navigation = useNavigate()

  useEffect((): void => {
    if (state.isAuth) {
      navigation(RoutePath.MAIN)
    }
  }, [state.isAuth, navigation])

  return (
    <div>
      <Header />
      <LoginSection />
    </div>
  )
}

export default LoginPage
