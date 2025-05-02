import { Form } from '@/shared/ui/Form/Form'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'
import { FormButton } from './FormButton'
import type { JSX } from 'react'
import './style.scss'

export const LoginForm = (): JSX.Element => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
  }
  return (
    <Form className={['form']} onSubmit={handleSubmit}>
      <EmailInput />
      <PasswordInput />
      <FormButton />
    </Form>
  )
}
