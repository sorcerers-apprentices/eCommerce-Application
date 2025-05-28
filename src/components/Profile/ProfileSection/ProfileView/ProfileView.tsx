import { useEffect, useMemo, type ChangeEvent, type ReactElement } from 'react'
import type { TCustomerProfileForm } from '@/types/user-types'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent'
import { validateBirthDate, validateEmail, validateFirstName, validateLastName } from '@/shared/utilities/validation'
import { transformToValidationData, useValidate } from '@/hooks/useValidate'

type TProperties = {
  userData: TCustomerProfileForm<string>
  setUserData: (value: (previous: TCustomerProfileForm<string>) => TCustomerProfileForm<string>) => void
  serverErrors?: Partial<TCustomerProfileForm<string>>
  disabled?: boolean
  onValidationChange?: (isValid: boolean) => void
}

export const ProfileView = ({
  userData,
  setUserData,
  disabled,
  onValidationChange,
  serverErrors,
}: TProperties): ReactElement => {
  const validationData = useMemo(() => transformToValidationData(userData), [userData])
  const { errors, isValid } = useValidate(validationData, {
    email: [validateEmail],
    firstName: [validateFirstName],
    lastName: [validateLastName],
    dateOfBirth: [validateBirthDate],
  })
  useEffect(() => {
    onValidationChange?.(isValid)
  }, [isValid, onValidationChange])
  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target
    setUserData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  return (
    <>
      <div>
        <InputComponent
          name="email"
          value={userData.email}
          type="email"
          title="Email"
          errors={errors.email || serverErrors?.email}
          disabled={disabled}
          onChange={handleChange}
          placeholder="user@example.com"
        />
        <InputComponent
          name="firstName"
          value={userData.firstName}
          type="text"
          title="First Name"
          errors={errors.firstName || serverErrors?.firstName}
          disabled={disabled}
          onChange={handleChange}
          placeholder="John"
        />
        <InputComponent
          name="lastName"
          value={userData.lastName}
          type="text"
          title="Last Name"
          errors={errors.lastName || serverErrors?.lastName}
          disabled={disabled}
          onChange={handleChange}
          placeholder="Doe"
        />
        <InputComponent
          name="dateOfBirth"
          value={userData.dateOfBirth}
          title="Day of birthday"
          type="date"
          errors={errors.dateOfBirth || serverErrors?.dateOfBirth}
          disabled={disabled}
          onChange={handleChange}
          placeholder="1990-01-01"
        />
      </div>
    </>
  )
}
