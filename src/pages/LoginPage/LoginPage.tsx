import { type ReactElement } from 'react'
import { Header } from '@/components/Header/Header'
import { LoginSection } from '@/components/LoginSection/LoginSection'
import Footer from '@/components/Footer/Footer.tsx'

const LoginPage = (): ReactElement => {
  return (
    <div>
      <Header />
      <LoginSection />
      <Footer />
    </div>
  )
}

export default LoginPage
