import { type ReactElement } from 'react'
import { Header } from '@/components/Header/Header'
import { LoginSection } from '@/components/LoginSection/LoginSection'

const LoginPage = (): ReactElement => {
  return (
    <div>
      <Header />
      <LoginSection />
    </div>
  )
}

export default LoginPage
