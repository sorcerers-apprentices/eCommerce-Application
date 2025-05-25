import type { ChangeEvent, ReactElement } from 'react'
//import { Button } from '@/shared/ui/Button/Button'
import type { TCustomerProfileForm } from '@/components/types/user-types'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent'

type TProperties = {
  userData: TCustomerProfileForm<string>
  setUserData: (value: (previous: TCustomerProfileForm<string>) => TCustomerProfileForm<string>) => void
  errors?: TCustomerProfileForm<string>
  disabled: boolean
}

export const UserDataView = ({ userData, setUserData, disabled }: TProperties): ReactElement => {
  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target
    setUserData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }
  return (
    <>
      <InputComponent
        name="email"
        value={userData.email}
        type="email"
        title="Email"
        errors={null}
        disabled={disabled}
        onChange={handleChange}
      />
      <InputComponent
        name="firstName"
        value={userData.firstName}
        type="text"
        title="First Name"
        errors={null}
        disabled={disabled}
        onChange={handleChange}
      />
      <InputComponent
        name="lastName"
        value={userData.lastName}
        type="text"
        title="Last Name"
        errors={null}
        disabled={disabled}
        onChange={handleChange}
      />
      <InputComponent
        name="dateOfBirth"
        value={userData.dateOfBirth}
        title="Day of birthday"
        type="date"
        errors={null}
        disabled={disabled}
        onChange={handleChange}
      />
      {/* <Button onClick={onEdit}>Edit</Button> */}
    </>
  )
}
