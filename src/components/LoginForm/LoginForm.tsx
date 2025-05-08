import { Form } from '@/shared/ui/Form/Form'
import { FormButton } from './FormButton'
import { type ChangeEvent, type FormEvent, type JSX, useState } from 'react'
import './style.scss'
import { ApiErrorCode } from '@/server/api.ts'
import { isCommerceToolsError } from '@/shared/utilities/type-utilities.ts'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent.tsx'
import { useValidate } from '@/shared/hooks/useValidate.tsx'
import { validateEmail, validatePassword } from '@/shared/utilities/validation.ts'
import { authApi } from '@/server/auth-api.ts'

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
      await authApi.authenticate(formData.email.value, formData.password.value)
    } catch (error) {
      if (isCommerceToolsError(error)) {
        const firstError = error.body.errors[0]
        const field: string | undefined = firstError.field
        switch (firstError.code) {
          case ApiErrorCode.INVALID_CUSTOMER_ACCOUNT_CREDENTIALS:
            setServerErrors((previous) => ({ ...previous, email: firstError.message, password: firstError.message }))
            break
          case ApiErrorCode.LOCKED_FIELD:
            if (field) {
              setServerErrors((previous) => ({ ...previous, [field]: firstError.message }))
            } else {
              setServerErrors((previous) => ({ ...previous, email: firstError.message }))
            }
            break
          case ApiErrorCode.INVALID_FIELD:
            if (field) {
              setServerErrors((previous) => ({ ...previous, [field]: firstError.message }))
            } else {
              setServerErrors((previous) => ({ ...previous, email: firstError.message }))
            }
            break
          case ApiErrorCode.RESOURCE_NOT_FOUND:
            setServerErrors((previous) => ({ ...previous, email: firstError.message, password: firstError.message }))
            break
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
    <Form className={['form']} onSubmit={onSubmit}>
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
