import { Form } from '@/shared/ui/Form/Form'
import { type ChangeEvent, type FormEvent, type JSX, useState } from 'react'
import { ApiErrorCode } from '@/server/api.ts'
import {
  validateCountry,
  validateBirthDate,
  validateCity,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePostCode,
  validateStreet,
} from '@/shared/utilities/validation.ts'
import { FormButton } from '@/components/LoginForm/FormButton.tsx'
import { isCommerceToolsError } from '@/shared/utilities/type-utilities.ts'
import { SelectInput } from '@/shared/ui/SelectInput/SelectInput.tsx'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent.tsx'
import { useValidate } from '@/shared/hooks/useValidate.tsx'
import { authApi } from '@/server/auth-api.ts'

export const RegistrationForm = (): JSX.Element => {
  const [formData, setFormData] = useState({
    email: { value: '', touched: false },
    firstName: { value: '', touched: false },
    lastName: { value: '', touched: false },
    dateOfBirth: { value: '', touched: false },
    country: { value: '', touched: false },
    city: { value: '', touched: false },
    postalCode: { value: '', touched: false },
    street: { value: '', touched: false },
    password: { value: '', touched: false },
  })
  const [serverErrors, setServerErrors] = useState<{
    email?: string
    firstName?: string
    lastName?: string
    dateOfBirth?: string
    country?: string
    city?: string
    postalCode?: string
    street?: string
    password?: string
  }>({})

  const { errors, isValid } = useValidate(formData, {
    email: [validateEmail],
    firstName: [validateFirstName],
    lastName: [validateLastName],
    dateOfBirth: [validateBirthDate],
    country: [validateCountry],
    city: [validateCity],
    postalCode: [validatePostCode],
    street: [validateStreet],
    password: [validatePassword],
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      await authApi.register({
        email: formData.email.value,
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
        dateOfBirth: formData.dateOfBirth.value,
        street: formData.street.value,
        city: formData.city.value,
        postalCode: formData.postalCode.value,
        country: formData.country.value === 'United Kingdom' ? 'UK' : formData.country.value === 'Poland' ? 'PL' : 'ES',
        password: formData.password.value,
      })
    } catch (error) {
      if (isCommerceToolsError(error)) {
        const firstError = error.body.errors[0]
        const field: string | undefined = firstError.field
        switch (firstError.code) {
          case ApiErrorCode.DUPLICATE_FIELD:
            setServerErrors((previous) => ({ ...previous, email: firstError.message }))
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
          case ApiErrorCode.REQUIRED_FIELD:
            if (field) {
              setServerErrors((previous) => ({ ...previous, [field]: firstError.message }))
            } else {
              setServerErrors((previous) => ({ ...previous, email: firstError.message }))
            }
            break
          case ApiErrorCode.RESOURCE_NOT_FOUND:
            setServerErrors((previous) => ({ ...previous, email: firstError.message }))
            break
        }
      }
      throw new Error(JSON.stringify(error))
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: { value, touched: true } }))
  }

  return (
    <Form className={['form', 'section']} onSubmit={onSubmit}>
      <InputComponent
        value={formData.email.value}
        name={'email'}
        label={'Email'}
        type={'email'}
        placeholder={'example@email.com'}
        errors={errors.email || serverErrors.email}
        onChange={handleChange}
      />
      <InputComponent
        value={formData.firstName.value}
        name={'firstName'}
        label={'First Name'}
        type={'text'}
        placeholder={'Scooby'}
        allowWhitespaces={true}
        errors={errors.firstName || serverErrors.firstName}
        onChange={handleChange}
      />
      <InputComponent
        value={formData.lastName.value}
        name={'lastName'}
        label={'Last Name'}
        type={'text'}
        placeholder={'Doo'}
        allowWhitespaces={true}
        errors={errors.lastName || serverErrors.lastName}
        onChange={handleChange}
      />
      <InputComponent
        value={formData.dateOfBirth.value}
        name={'dateOfBirth'}
        label={'Day of birthday'}
        type={'date'}
        errors={errors.dateOfBirth || serverErrors.dateOfBirth}
        onChange={handleChange}
      />

      <fieldset>
        <SelectInput
          value={formData.country.value}
          name={'country'}
          label={'Country'}
          options={['United Kingdom', 'Poland', 'Spain']}
          errors={errors.country || serverErrors.country}
          onChange={handleChange}
        />
        <InputComponent
          value={formData.city.value}
          name={'city'}
          label={'City'}
          type={'text'}
          placeholder={'London'}
          allowWhitespaces={true}
          errors={errors.city || serverErrors.city}
          onChange={handleChange}
        />
        <InputComponent
          value={formData.postalCode.value}
          name={'postalCode'}
          label={'Postal Code'}
          type={'text'}
          placeholder={'221B'}
          allowWhitespaces={true}
          errors={errors.postalCode || serverErrors.postalCode}
          onChange={handleChange}
        />
        <InputComponent
          value={formData.street.value}
          name={'street'}
          label={'Street'}
          type={'text'}
          placeholder={'Baker Street'}
          allowWhitespaces={true}
          errors={errors.street || serverErrors.street}
          onChange={handleChange}
        />
      </fieldset>

      <InputComponent
        value={formData.password.value}
        name={'password'}
        label={'Password'}
        type={'text'}
        errors={errors.password || serverErrors.password}
        onChange={handleChange}
        isPassword={true}
      />

      <FormButton value={'Submit'} disabled={!isValid} />
    </Form>
  )
}
