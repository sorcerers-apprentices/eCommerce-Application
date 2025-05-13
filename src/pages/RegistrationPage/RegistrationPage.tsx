import type { ReactElement } from 'react'
import { Header } from '@/components/Header/Header.tsx'
import { RegistrationForm } from '@/components/RegistrationForm/RegistrationForm.tsx'

const RegistrationPage = (): ReactElement => {
  return (
    <>
      <Header />
      <RegistrationForm />
    </>
  )
}

export default RegistrationPage
