import { Form } from '@/shared/ui/Form/Form'
import { FormButton } from './FormButton'
import { type FormEvent, type JSX, useEffect, useState } from 'react'
import './style.scss'
import { EmailInput } from '@/components/Input/EmailInput.tsx'
import { PasswordInput } from '@/components/Input/PasswordInput.tsx'
import { ApiErrorCode, authenticate } from '@/server/api.ts'
import { validateEmail, validatePassword } from '@/components/LoginForm/validation.ts'
import { readString, required } from '@/shared/utilities/form-utilities.ts'
import { isCommerceToolsError } from '@/shared/utilities/type-utilities.ts'

export const LoginForm = (): JSX.Element => {
  const [emailErrors, setEmailErrors] = useState<string | null | undefined>(undefined)
  const [passwordErrors, setPasswordErrors] = useState<string | null | undefined>(undefined)
  const [formDisabled, setFormDisabled] = useState<boolean>(true)

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = required(readString(formData.get('email')))
    const password = required(readString(formData.get('password')))

    try {
      await authenticate(email, password)
    } catch (error) {
      if (isCommerceToolsError(error)) {
        const firstError = error.body.errors[0]
        if (firstError.code === ApiErrorCode.INVALID_CUSTOMER_ACCOUNT_CREDENTIALS) {
          setEmailErrors(firstError.message)
          setPasswordErrors(firstError.message)
          return
        }
      }
      throw new Error(JSON.stringify(error))
    }
  }

  const onEmailChange = (email: string): void => setEmailErrors(validateEmail(email))
  const onPasswordChange = (password: string): void => setPasswordErrors(validatePassword(password))

  useEffect(() => setFormDisabled(emailErrors !== null || passwordErrors !== null), [emailErrors, passwordErrors])

  return (
    <Form className={['form']} onSubmit={onSubmit}>
      <EmailInput errors={emailErrors} onChange={onEmailChange} />
      <PasswordInput errors={passwordErrors} onChange={onPasswordChange} />
      <FormButton value={'Login'} disabled={formDisabled} />
    </Form>
  )
}
