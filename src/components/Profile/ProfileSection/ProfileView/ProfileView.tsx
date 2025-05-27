import { type ChangeEvent, type ReactElement } from 'react'
import type { TCustomerProfileForm } from '@/types/user-types'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent'

type TProperties = {
  userData: TCustomerProfileForm<string>
  setUserData: (value: (previous: TCustomerProfileForm<string>) => TCustomerProfileForm<string>) => void
  errors?: TCustomerProfileForm<string>
  disabled: boolean
}

export const ProfileView = ({ userData, setUserData, disabled }: TProperties): ReactElement => {
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
          errors={null}
          disabled={disabled}
          onChange={handleChange}
          placeholder="user@example.com"
        />
        <InputComponent
          name="firstName"
          value={userData.firstName}
          type="text"
          title="First Name"
          errors={null}
          disabled={disabled}
          onChange={handleChange}
          placeholder="John"
        />
        <InputComponent
          name="lastName"
          value={userData.lastName}
          type="text"
          title="Last Name"
          errors={null}
          disabled={disabled}
          onChange={handleChange}
          placeholder="Doe"
        />
        <InputComponent
          name="dateOfBirth"
          value={userData.dateOfBirth}
          title="Day of birthday"
          type="date"
          errors={null}
          disabled={disabled}
          onChange={handleChange}
          placeholder="1990-01-01"
        />
      </div>
    </>
  )
}
