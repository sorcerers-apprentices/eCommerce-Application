import { useUserContext } from '@/hooks/useUserContext.tsx'
import { useNavigate } from 'react-router-dom'
import { type ReactElement, useEffect } from 'react'
import { Header } from '@/components/Header/Header'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { LoginSection } from '@/components/LoginSection/LoginSection'

const LoginPage = (): ReactElement => {
  const { state } = useUserContext()
  const navigation = useNavigate()

  useEffect((): void => {
    if (state.email) {
      navigation(RoutePath.MAIN)
    }
  }, [state.email, navigation])

  return (
    <div>
      <Header />
      <LoginSection />
    </div>
  )
}

export default LoginPage
