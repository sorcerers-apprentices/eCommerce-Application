import { MainPageButton } from './ErrorPageButton'
import { LoginPageButton } from './LoginPageButton'
import { RegistrationPageButton } from './RegistrationPageButton'
import { ErrorPageButton } from './MainPageButton'
import type { ReactElement } from 'react'

export const NavigateButtons = (): ReactElement => {
  return (
    <div className="nav">
      <MainPageButton />
      <LoginPageButton />
      <RegistrationPageButton />
      <ErrorPageButton />
    </div>
  )
}
