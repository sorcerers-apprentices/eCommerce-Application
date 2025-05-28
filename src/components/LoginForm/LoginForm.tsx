import { useAuth } from '@/hooks/useAuth'
import { FormButton } from './FormButton'
import { ApiErrorCode } from '@/server/api'
import { Form } from '@/shared/ui/Form/Form'
import { useValidate } from '@/hooks/useValidate'
import { isCommerceToolsError } from '@/shared/utilities/type-utilities'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent'
import { type ChangeEvent, type FormEvent, type JSX, useState } from 'react'
import { validateEmail, validatePassword } from '@/shared/utilities/validation'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

export const LoginForm = (): JSX.Element => {
  const { login } = useAuth()
  const navigate = useNavigate()
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
      await login(formData.email.value, formData.password.value)
      navigate(RoutePath.MAIN)
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
    <Form className={['section']} onSubmit={onSubmit}>
      <InputComponent
        value={formData.email.value}
        onChange={handleChange}
        name={'email'}
        title={'Email'}
        type={'email'}
        placeholder={'example@email.com'}
        errors={errors.email || serverErrors.email}
      />
      <InputComponent
        value={formData.password.value}
        onChange={handleChange}
        name={'password'}
        title={'Password'}
        type={'text'}
        errors={errors.password || serverErrors.password}
        isPassword={true}
      />
      <FormButton value={'Login'} disabled={!isValid} />
    </Form>
  )
}
