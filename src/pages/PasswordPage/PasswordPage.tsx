import { Header } from '@/components/Header/Header'
import { PasswordSection } from '@/components/Profile/PasswordSection/PassworSection'
import type { ReactElement } from 'react'

const PasswordPage = (): ReactElement => {
  return (
    <>
      <Header />
      <PasswordSection />
    </>
  )
}

export default PasswordPage
