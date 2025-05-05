import { Form } from '@/shared/ui/Form/Form'
import { type FormEvent, type JSX, useEffect, useState } from 'react'
import { EmailInput } from '@/components/Input/EmailInput.tsx'
import { PasswordInput } from '@/components/Input/PasswordInput.tsx'
import { register } from '@/server/api.ts'
import {
  validateBirthDate,
  validateCity,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePostCode,
  validateStreet,
} from '@/components/LoginForm/validation.ts'
import { FormButton } from '@/components/LoginForm/FormButton.tsx'
import { readString, required } from '@/shared/utilities/form-utilities.ts'
import { isCommerceToolsError } from '@/shared/utilities/type-utilities.ts'
import { TextInput } from '@/components/Input/TextInput.tsx'
import { DateInput } from '@/components/Input/DateInput.tsx'
import { CountriesSelect } from '@/components/Input/CountriesSelect.tsx'

export const RegistrationForm = (): JSX.Element => {
  const [emailErrors, setEmailErrors] = useState<string | null | undefined>(undefined)
  const [passwordErrors, setPasswordErrors] = useState<string | null | undefined>(undefined)
  const [firstNameErrors, setFirstNameErrors] = useState<string | null | undefined>(undefined)
  const [lastNameErrors, setLastNameErrors] = useState<string | null | undefined>(undefined)
  const [dateOfBirthErrors, setDateOfBirthErrors] = useState<string | null | undefined>(undefined)
  const [streetErrors, setStreetErrors] = useState<string | null | undefined>(undefined)
  const [cityErrors, setCityErrors] = useState<string | null | undefined>(undefined)
  const [postalCodeErrors, setPostalCodeErrors] = useState<string | null | undefined>(undefined)
  const [countryErrors, setCountryErrors] = useState<string | null | undefined>(undefined)
  const [formDisabled, setFormDisabled] = useState<boolean>(true)

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = required(readString(formData.get('email')))
    const firstName = required(readString(formData.get('firstName')))
    const lastName = required(readString(formData.get('lastName')))
    const dateOfBirth = required(readString(formData.get('dateOfBirth')))
    const street = required(readString(formData.get('street')))
    const city = required(readString(formData.get('city')))
    const postalCode = required(readString(formData.get('postalCode')))
    const country = required(readString(formData.get('country')))
    const password = required(readString(formData.get('password')))

    try {
      await register(email, firstName, lastName, dateOfBirth, street, city, postalCode, country, password)
    } catch (error) {
      if (isCommerceToolsError(error)) {
        const firstError = error.body.errors[0]
        if (firstError.code === 'invalid_customer_account_credentials') {
          setEmailErrors(firstError.message)
          return
        }
      }
      throw new Error(JSON.stringify(error))
    }
  }

  const onEmailChange = (email: string): void => setEmailErrors(validateEmail(email))
  const onPasswordChange = (password: string): void => setPasswordErrors(validatePassword(password))
  const onFirstNameChange = (firstName: string): void => setFirstNameErrors(validateFirstName(firstName))
  const onLastNameChange = (lastName: string): void => setLastNameErrors(validateLastName(lastName))
  const onDateOfBirthdayChange = (birthDate: string): void => setDateOfBirthErrors(validateBirthDate(birthDate))
  const onStreetChange = (street: string): void => setStreetErrors(validateStreet(street))
  const onCityChange = (city: string): void => setCityErrors(validateCity(city))
  const onPostalCodeChange = (postalCode: string): void => setPostalCodeErrors(validatePostCode(postalCode))
  const onCountryChange = (country: string): void => setCountryErrors(validatePostCode(country))

  useEffect(() => setFormDisabled(emailErrors !== null || passwordErrors !== null), [emailErrors, passwordErrors])

  return (
    <Form className={['form']} onSubmit={onSubmit}>
      <EmailInput errors={emailErrors} onChange={onEmailChange} />

      <TextInput name={'firstName'} label={'First Name'} errors={firstNameErrors} onChange={onFirstNameChange} />
      <TextInput name={'lastName'} label={'Last Name'} errors={lastNameErrors} onChange={onLastNameChange} />
      <DateInput
        name={'dateOfBirth'}
        label={'day of birthday'}
        errors={dateOfBirthErrors}
        onChange={onDateOfBirthdayChange}
      />

      <fieldset>
        <CountriesSelect
          name={'countries'}
          label={'Country'}
          value={'country'}
          options={['United Kingdom', 'Poland', 'Spain']}
          errors={countryErrors}
          onChange={onCountryChange}
        />
        <TextInput name={'city'} label={'City'} errors={cityErrors} onChange={onCityChange} />
        <TextInput name={'postalCode'} label={'Postal Code'} errors={postalCodeErrors} onChange={onPostalCodeChange} />
        <TextInput name={'street'} label={'Street'} errors={streetErrors} onChange={onStreetChange} />
      </fieldset>

      <PasswordInput errors={passwordErrors} onChange={onPasswordChange} />

      <FormButton value={'Submit'} disabled={formDisabled} />
    </Form>
  )
}
