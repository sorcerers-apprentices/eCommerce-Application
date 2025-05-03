import { Form } from '@/shared/ui/Form/Form'
import { FormButton } from './FormButton'
import { type FormEvent, type JSX, useEffect, useState } from 'react'
import './style.scss'
import { EmailInput } from '@/components/LoginForm/Input/EmailInput.tsx'
import { PasswordInput } from '@/components/LoginForm/Input/PasswordInput.tsx'
import { authenticate } from '@/server/api.ts'
import { validateEmail, validatePassword } from '@/components/LoginForm/validation.ts'

const toString = (value: FormDataEntryValue | null): string | null => {
  if (typeof value === 'string' || value === null) {
    return value
  } else {
    throw Error('Unexpected type: ' + typeof value)
  }
}

const required = <T,>(value: T | null): T => {
  if (value === null) {
    throw new Error('Unexpected null value')
  }
  return value
}

type CommerceToolsError = {
  body: {
    errors: Array<{ code: string; message: string }>
  }
}

const isObject = (value: unknown): value is object => {
  return typeof value === 'object' && value !== null
}

const isCommerceToolsError = (error: unknown): error is CommerceToolsError => {
  if (isObject(error) && 'body' in error) {
    return isObject(error.body) && 'errors' in error.body
  } else {
    return false
  }
}

export const LoginForm = (): JSX.Element => {
  const [emailErrors, setEmailErrors] = useState<string | null | undefined>(undefined)
  const [passwordErrors, setPasswordErrors] = useState<string | null | undefined>(undefined)
  const [formDisabled, setFormDisabled] = useState<boolean>(true)

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = required(toString(formData.get('email')))
    const password = required(toString(formData.get('password')))

    try {
      await authenticate(email, password)
    } catch (error) {
      if (isCommerceToolsError(error)) {
        const firstError = error.body.errors[0]
        if (firstError.code === 'invalid_customer_account_credentials') {
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
      <FormButton disabled={formDisabled} />
    </Form>
  )
}
