import { Header } from '@/components/Header/Header'
import { PasswordSection } from '@/components/Profile/PasswordSection/PassworSection'
import type { ReactElement } from 'react'
import Footer from '@/components/Footer/Footer.tsx'

const PasswordPage = (): ReactElement => {
  return (
    <>
      <Header />
      <PasswordSection />
      <Footer />
    </>
  )
}

export default PasswordPage
