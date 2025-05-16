import type { ReactElement } from 'react'
import { Header } from '@/components/Header/Header.tsx'
import { RegistrationSection } from '@/components/RegistrationSection/RegistrationSection.tsx'

const RegistrationPage = (): ReactElement => {
  return (
    <>
      <Header />
      <RegistrationSection />
    </>
  )
}

export default RegistrationPage
