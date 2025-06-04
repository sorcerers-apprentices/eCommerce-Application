import {
  validateCountry,
  validateBirthDate,
  validateCity,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validateStreet,
  createPostalCodeValidator,
} from '@/shared/utilities/validation'
import { toast } from 'react-hot-toast'
import { ApiErrorCode } from '@/server/api'
import { authApi } from '@/server/auth-api'
import { Form } from '@/shared/ui/Form/Form'
import { useNavigate } from 'react-router-dom'
import s from './RegistrationForm.module.scss'
import { useValidate } from '@/hooks/useValidate'
import { Toggler } from '@/shared/ui/Toggler/Toggler'
import { useUserContext } from '@/hooks/useUserContext'
import { FormButton } from '@/components/LoginForm/FormButton'
import { SelectInput } from '@/shared/ui/SelectInput/SelectInput'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { isCommerceToolsError } from '@/shared/utilities/type-utilities'
import { UserActionType } from '@/app/providers/UserProvider/UserReducer'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent'
import { type ChangeEvent, type FormEvent, type JSX, useState } from 'react'

export const RegistrationForm = (): JSX.Element => {
  const [sameAddress, setSameAddress] = useState(false)
  const [defaultShippingValue, setDefaultShippingValue] = useState(false)
  const [defaultBillingValue, setDefaultBillingValue] = useState(false)
  const navigation = useNavigate()
  const { dispatch } = useUserContext()

  const [formData, setFormData] = useState({
    email: { value: '', touched: false },
    firstName: { value: '', touched: false },
    lastName: { value: '', touched: false },
    dateOfBirth: { value: '', touched: false },
    password: { value: '', touched: false },

    shippingCountry: { value: '', touched: false },
    shippingCity: { value: '', touched: false },
    shippingPostalCode: { value: '', touched: false },
    shippingStreet: { value: '', touched: false },

    billingCountry: { value: '', touched: false },
    billingCity: { value: '', touched: false },
    billingPostalCode: { value: '', touched: false },
    billingStreet: { value: '', touched: false },
  })
  const [serverErrors, setServerErrors] = useState<{
    email?: string
    firstName?: string
    lastName?: string
    dateOfBirth?: string
    password?: string
    shippingCountry?: string
    shippingCity?: string
    shippingPostalCode?: string
    shippingStreet?: string
    billingCountry?: string
    billingCity?: string
    billingPostalCode?: string
    billingStreet?: string
  }>({})

  const { errors, isValid } = useValidate(formData, {
    email: [validateEmail],
    firstName: [validateFirstName],
    lastName: [validateLastName],
    dateOfBirth: [validateBirthDate],
    password: [validatePassword],
    shippingCountry: [validateCountry],
    shippingCity: [validateCity],
    shippingPostalCode: [createPostalCodeValidator('shippingCountry')],
    shippingStreet: [validateStreet],
    billingCountry: [validateCountry],
    billingCity: [validateCity],
    billingPostalCode: [createPostalCodeValidator('billingCountry')],
    billingStreet: [validateStreet],
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      const result = await authApi.register({
        email: formData.email.value,
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
        dateOfBirth: formData.dateOfBirth.value,
        password: formData.password.value,
        shippingStreet: formData.shippingStreet.value,
        shippingCity: formData.shippingCity.value,
        shippingPostalCode: formData.shippingPostalCode.value,
        shippingCountry:
          formData.shippingCountry.value === 'United Kingdom'
            ? 'UK'
            : formData.shippingCountry.value === 'Poland'
              ? 'PL'
              : 'ES',
        billingStreet: formData.billingStreet.value,
        billingCity: formData.billingCity.value,
        billingPostalCode: formData.billingPostalCode.value,
        billingCountry:
          formData.billingCountry.value === 'United Kingdom'
            ? 'UK'
            : formData.billingCountry.value === 'Poland'
              ? 'PL'
              : 'ES',
        defaultShippingAddress: defaultShippingValue ? 0 : undefined,
        defaultBillingAddress: defaultBillingValue ? 1 : undefined,
      })
      dispatch({ type: UserActionType.LOGIN, payload: { email: result.body.customer.email } })
      navigation(RoutePath.MAIN)
      toast.success('Account created successfully')
    } catch (error) {
      if (isCommerceToolsError(error)) {
        const firstError = error.body.errors[0]
        toast.error('Registration error')
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
    if (sameAddress) {
      switch (name) {
        case 'shippingCity':
          setFormData((previous) => ({ ...previous, ['billingCity']: { value, touched: true } }))
          break
        case 'shippingCountry':
          setFormData((previous) => ({ ...previous, ['billingCountry']: { value, touched: true } }))
          break
        case 'shippingPostalCode':
          setFormData((previous) => ({ ...previous, ['billingPostalCode']: { value, touched: true } }))
          break
        case 'shippingStreet':
          setFormData((previous) => ({ ...previous, ['billingStreet']: { value, touched: true } }))
          break
      }
    }
  }

  const handleSameAddress = (sameAddressEnabled: boolean): void => {
    setSameAddress(sameAddressEnabled)
    if (sameAddressEnabled) {
      setFormData((previous) => {
        return {
          ...previous,
          billingCountry: { ...previous.shippingCountry },
          billingCity: { ...previous.shippingCity },
          billingPostalCode: { ...previous.shippingPostalCode },
          billingStreet: { ...previous.shippingStreet },
        }
      })
    }
  }

  return (
    <Form className={['form', 'section']} onSubmit={onSubmit}>
      <InputComponent
        value={formData.email.value}
        name={'email'}
        title={'Email'}
        type={'email'}
        placeholder={'example@email.com'}
        errors={errors.email || serverErrors.email}
        onChange={handleChange}
      />
      <InputComponent
        value={formData.password.value}
        name={'password'}
        title={'Password'}
        type={'text'}
        errors={errors.password || serverErrors.password}
        onChange={handleChange}
        isPassword={true}
      />
      <InputComponent
        value={formData.firstName.value}
        name={'firstName'}
        title={'First Name'}
        type={'text'}
        placeholder={'Scooby'}
        allowWhitespaces={true}
        errors={errors.firstName || serverErrors.firstName}
        onChange={handleChange}
      />
      <InputComponent
        value={formData.lastName.value}
        name={'lastName'}
        title={'Last Name'}
        type={'text'}
        placeholder={'Doo'}
        allowWhitespaces={true}
        errors={errors.lastName || serverErrors.lastName}
        onChange={handleChange}
      />
      <InputComponent
        value={formData.dateOfBirth.value}
        name={'dateOfBirth'}
        title={'Day of birthday'}
        type={'date'}
        errors={errors.dateOfBirth || serverErrors.dateOfBirth}
        onChange={handleChange}
      />
      <Toggler
        label={'Use shipping address as billing'}
        onInput={(event: ChangeEvent<HTMLInputElement>) => {
          const isChecked = event.target.checked
          handleSameAddress(isChecked)
        }}
      />
      <div className={s.addresses}>
        <fieldset className={s.form_fieldset}>
          <legend>Shipping Address</legend>
          <SelectInput
            value={formData.shippingCountry.value}
            name={'shippingCountry'}
            title={'Country'}
            options={['United Kingdom', 'Poland', 'Spain']}
            errors={errors.shippingCountry || serverErrors.shippingCountry}
            onChange={handleChange}
          />
          <InputComponent
            value={formData.shippingCity.value}
            name={'shippingCity'}
            title={'City'}
            type={'text'}
            placeholder={'London'}
            allowWhitespaces={true}
            errors={errors.shippingCity || serverErrors.shippingCity}
            onChange={handleChange}
          />
          <InputComponent
            value={formData.shippingPostalCode.value}
            name={'shippingPostalCode'}
            title={'Postal Code'}
            type={'text'}
            placeholder={'221B'}
            allowWhitespaces={true}
            errors={errors.shippingPostalCode || serverErrors.shippingPostalCode}
            onChange={handleChange}
          />
          <InputComponent
            value={formData.shippingStreet.value}
            name={'shippingStreet'}
            title={'Street'}
            type={'text'}
            placeholder={'Baker Street'}
            allowWhitespaces={true}
            errors={errors.shippingStreet || serverErrors.shippingStreet}
            onChange={handleChange}
          />
          <Toggler
            label={'Set as default shipping address'}
            onInput={(event: ChangeEvent<HTMLInputElement>) => {
              const isChecked = event.target.checked
              setDefaultShippingValue(isChecked)
            }}
          />
        </fieldset>
        <fieldset className={s.form_fieldset}>
          <legend>Billing Address</legend>
          <SelectInput
            value={formData.billingCountry.value}
            name={'Choose your Country'}
            title={'Country'}
            disabled={sameAddress}
            options={['United Kingdom', 'Poland', 'Spain']}
            errors={errors.billingCountry || serverErrors.billingCountry}
            onChange={handleChange}
          />
          <InputComponent
            value={formData.billingCity.value}
            name={'billingCity'}
            title={'City'}
            type={'text'}
            disabled={sameAddress}
            placeholder={'London'}
            allowWhitespaces={true}
            errors={errors.billingCity || serverErrors.billingCity}
            onChange={handleChange}
          />
          <InputComponent
            value={formData.billingPostalCode.value}
            name={'billingPostalCode'}
            title={'Postal Code'}
            type={'text'}
            disabled={sameAddress}
            placeholder={'221B'}
            allowWhitespaces={true}
            errors={errors.billingPostalCode || serverErrors.billingPostalCode}
            onChange={handleChange}
          />
          <InputComponent
            value={formData.billingStreet.value}
            name={'billingStreet'}
            title={'Street'}
            type={'text'}
            disabled={sameAddress}
            placeholder={'Baker Street'}
            allowWhitespaces={true}
            errors={errors.billingStreet || serverErrors.billingStreet}
            onChange={handleChange}
          />
          <Toggler
            label={'Set as default billing address'}
            onInput={(event: ChangeEvent<HTMLInputElement>) => {
              const isChecked = event.target.checked
              setDefaultBillingValue(isChecked)
            }}
          />
        </fieldset>
      </div>

      <FormButton value={'Submit'} disabled={!isValid} />
    </Form>
  )
}
