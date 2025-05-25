import { type ReactElement } from 'react'
//import { Button } from '@/shared/ui/Button/Button'
import type { TCustomerProfileForm } from '@/components/types/user-types'
import { InputComponent } from '@/shared/ui/InputComponent/InputComponent'

type TProperties = {
  userData: TCustomerProfileForm<string>
  errors?: TCustomerProfileForm<string>
  disabled: boolean
  // onEdit: () => void
}

export const UserDataView = ({ userData }: TProperties): ReactElement => {
  return (
    <>
      <InputComponent name="email" value={userData.email} type="email" title="Email" errors={null} disabled />
      <InputComponent
        name="firstName"
        value={userData.firstName}
        type="text"
        title="First Name"
        errors={null}
        disabled
      />
      <InputComponent name="lastName" value={userData.lastName} type="text" title="Last Name" errors={null} disabled />
      <InputComponent
        name="dateOfBirth"
        value={userData.dateOfBirth}
        title="Day of birthday"
        type="date"
        errors={null}
        disabled
      />
      {/* <Button onClick={onEdit}>Edit</Button> */}
    </>
  )
}
