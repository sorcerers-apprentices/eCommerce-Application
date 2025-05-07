import type { ReactElement } from 'react'
import { RegistrationForm } from '@/components/RegistrationForm/RegistrationForm.tsx'

const RegistrationPage = (): ReactElement => {
  return (
    <div>
      <h1>Registration Pages</h1>
      <RegistrationForm />
    </div>
  )
}

export default RegistrationPage
