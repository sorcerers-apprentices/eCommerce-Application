import type { ReactElement } from 'react'
import { Header } from '@/components/Header/Header.tsx'
import { RegistrationSection } from '@/components/RegistrationSection/RegistrationSection.tsx'
import Footer from '@/components/Footer/Footer.tsx'

const RegistrationPage = (): ReactElement => {
  return (
    <>
      <Header />
      <RegistrationSection />
      <Footer />
    </>
  )
}

export default RegistrationPage
