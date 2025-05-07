import { Form } from '@/shared/ui/Form/Form'
import { FormButton } from './FormButton'
import { type ChangeEvent, type FormEvent, type JSX, useState } from 'react'
import { api, ApiErrorCode } from '@/server/api.ts'
import { isCommerceToolsError } from '@/shared/utilities/type-utilities.ts'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent.tsx'
import { useValidate } from '@/shared/hooks/useValidate.tsx'
import { validateEmail, validatePassword } from '@/shared/utilities/validation.ts'

export const LoginForm = (): JSX.Element => {
  const [formData, setFormData] = useState({
    email: { value: '', touched: false },
    password: { value: '', touched: false },
  })
  const [serverErrors, setServerErrors] = useState<{ email?: string; password?: string }>({})
  const { errors, isValid } = useValidate(formData, {
    email: [validateEmail],
    password: [validatePassword],
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      await api.user.authenticate(formData.email.value, formData.password.value)
    } catch (error) {
      if (isCommerceToolsError(error)) {
        const firstError = error.body.errors[0]
        if (firstError.code === ApiErrorCode.INVALID_CUSTOMER_ACCOUNT_CREDENTIALS) {
          setServerErrors((previous) => ({ ...previous, email: firstError.message, password: firstError.message }))
          return
        }
      }
      throw new Error(JSON.stringify(error))
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: { value, touched: true } }))
  }

  return (
    <Form className={['section']} onSubmit={onSubmit}>
      <InputComponent
        value={formData.email.value}
        onChange={handleChange}
        name={'email'}
        label={'Email'}
        type={'email'}
        placeholder={'example@email.com'}
        errors={errors.email || serverErrors.email}
      />
      <InputComponent
        value={formData.password.value}
        onChange={handleChange}
        name={'password'}
        label={'Password'}
        type={'text'}
        errors={errors.password || serverErrors.password}
        isPassword={true}
      />
      <FormButton value={'Login'} disabled={!isValid} />
    </Form>
  )
}
